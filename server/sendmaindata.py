import app
import uploadtoexcel
import json

def funcsendmaindata(limit):
    
    try:

        data = app.main(limit)
        load_exceldata = None
        unmatched = []

        exceldata = uploadtoexcel.GetExceldata()

        if exceldata:
           load_exceldata = json.loads(exceldata)
      
        def remove_key(d, key="Messageid"):
            return {k: v for k, v in d.items() if k != key}

        if load_exceldata and len(load_exceldata) > 0:
            for i in data:
                vals = remove_key(i)
                if vals not in load_exceldata:
                   unmatched.append(i)

            return{'data': unmatched, 'exceldata': exceldata}
        else:
            return {'data': data, 'exceldata': []}  
        
    except Exception as e:
        print(e)