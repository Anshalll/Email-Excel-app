import pandas as pd
import os

def UploadtoExcel(data):
    try: 
        from_arr = []
        Time_arr = []
        Url_arr = []
        Subject_arr = []
    
        for i in data:
            
            if i.get('From'):
                from_arr.append(i['From'])
            if i.get('Hyperlink'):
                Url_arr.append(i['Hyperlink'])
            if i.get('Subject'):
                Subject_arr.append(i['Subject'])
            if i.get('Date'):
                Time_arr.append(i['Date'])

        file_path = r'D:\code\fetchemails\server\main.xlsx'
        mail_data = pd.DataFrame({
            'Date': Time_arr,
            'From': from_arr,
            'Hyperlink': Url_arr,
            'Subject': Subject_arr
        })


        if os.path.exists(file_path):
            try:
        
                existing_data = pd.read_excel(file_path, engine='openpyxl')

        
                if existing_data.empty:
                
                    with pd.ExcelWriter(file_path, mode='w', engine='openpyxl') as writer:
                        mail_data.to_excel(writer, index=False)
                    print("Data saved to new excel file!")
                else:
                
                    combined_data = pd.concat([existing_data, mail_data], ignore_index=True)
                    with pd.ExcelWriter(file_path, mode='w', engine='openpyxl') as writer:
                        combined_data.to_excel(writer, index=False)
                    print("Data appended to existing excel file!")
            except Exception as e:
                print("An error occurred:", e)
        else:
        
            with pd.ExcelWriter(file_path, mode='w', engine='openpyxl') as writer:
                mail_data.to_excel(writer, index=False)
            print("New excel file created and data saved!")

    except Exception as e:
        print(e)

def GetExceldata():
    try:
        path = f"{os.getcwd()}\main.xlsx"
        json_data = []
        if os.path.exists(path): 

            readed_data = pd.read_excel(path, engine="openpyxl")
            if not readed_data.empty:
            
                json_data = readed_data.to_json(orient="records")

        return json_data
    except Exception as e:
        print(e)

    