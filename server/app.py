

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError



SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]


def main():

  creds = None

  if os.path.exists("token.json"):
    creds = Credentials.from_authorized_user_file("token.json", SCOPES)
  # If there are no (valid) credentials available, let the user log in.
  if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
      creds.refresh(Request())
    else:
      flow = InstalledAppFlow.from_client_secrets_file(
          f"{os.getcwd()}\credentials.json", SCOPES
      )
      creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open("token.json", "w") as token:
      token.write(creds.to_json())

  try:

    data_arr = []

    date= None
    From= None
    Subject=None
    HyperLink=None

    # Call the Gmail API
    service = build("gmail", "v1", credentials=creds)
    results  = service.users().messages().list(userId="me" , labelIds = ['INBOX'] , includeSpamTrash=False).execute()

    if(results['messages'] and len(results['messages']) ): 



      for data in results['messages'][:10]:
   
        outputresults = service.users().messages().get(userId="me" , id=data['id']).execute()

        for vals in outputresults['payload']['headers']:

          if vals['name'] == "Date": 
           date = vals['value']
          if vals['name'] == "From":
            From = vals['value']
          if vals['name'] == "From":
            Subject = vals['value']
          
          HyperLink = f"https://mail.google.com/mail/u/0/#inbox/{data['id']}"
          finalvals = { 'date' : date , 'From': From, 'Subject': Subject , 'Hyperlink': HyperLink }
 
        data_arr.append(finalvals)




    return data_arr
  
  except HttpError as error:
    
    print(f"An error occurred: {error}")


if __name__ == "__main__":
  main()