import pandas as pd

file_name = 'chunk_1.csv'
print("foramttazione partita -> " + file_name)

column_names = ["Data_ricerca","Usser","Codice interno","Rag. soc.","Partita iva","Targa","Costo","Trovato","codice_errore_infocar","Socio","Partner","Marca","Modello","Versione","CodInfocar","Kw","Alimentazione"]

# Read CSV file
df = pd.read_csv(file_name ,delimiter=";", names=column_names, on_bad_lines='skip',low_memory=False)
print("cvs letto")

# Convert string timestamps to the desired format
df["Data_ricerca"] = pd.to_datetime(df["Data_ricerca"],errors="coerce").dt.strftime('%Y-%m-%d %H:%M:%S')

del df["Codice interno"]
print("colonna codice interno cancellata")


#df = df[df['Kw'].apply(lambda x: isinstance(x, int))]
#df.query('Kw > 0', inplace=True)
#print("filtrati Kw non validi")
#df['Targa'].apply(lambda x: x.upper())
#print("targhe maiuscolo")

print(df)

# Save the processed CSV file
df.to_csv('/var/lib/mysql-files/processed.csv', index=False)
print("file salvato in /var/lib/mysql-files/processed.csv")
