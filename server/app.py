import os
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]

def main(limit):
    try: 
        creds = None

    
        if os.path.exists("token.json"):
            creds = Credentials.from_authorized_user_file("token.json", SCOPES)
        
    
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    os.path.join(os.getcwd(), "credentials.json"), SCOPES
                )
                creds = flow.run_local_server(port=0)
            

            with open("token.json", "w") as token:
                token.write(creds.to_json())

        try:
            data_arr = []

        
            service = build("gmail", "v1", credentials=creds)
            results = service.users().messages().list(userId="me", labelIds=['INBOX'], includeSpamTrash=False).execute()
        
            if 'messages' in results and results['messages']:
                for data in results['messages'][0:int(limit)]:
                    outputresults = service.users().messages().get(userId="me", id=data['id']).execute()
                
                    date = None
                    messageid = None
                    sender = None
                    subject = None
                    hyperlink = f"https://mail.google.com/mail/u/0/#inbox/{data['id']}"

                
                    for vals in outputresults['payload']['headers']:
                        if vals['name'] == "Date":
                            date = vals['value']
                        if vals['name'] == "Message-ID":
                            messageid = vals['value']
                        if vals['name'] == "From":
                            sender = vals['value']
                        if vals['name'] == "Subject":
                            subject = vals['value']
                    
                
                    if date and sender and subject and messageid:
                        finalvals = {
                            'Date': date,
                            'From': sender,
                            'Hyperlink': hyperlink,
                            'Subject': subject,
                            'Messageid': messageid
                        }
                        data_arr.append(finalvals)

    
            return data_arr

        except HttpError as error:
            print(f"An error occurred: {error}")

    except Exception as e:
        print(e)

if __name__ == "__main__":
    main()
