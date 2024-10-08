FROM node:latest

# Etapa 2: Definir o diretório de trabalho dentro do container
WORKDIR /app

# Etapa 3: Copiar o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Etapa 4: Instalar as dependências do projeto (incluindo PactumJS e outras necessárias)
RUN npm install

# Etapa 5: Copiar o restante do código do projeto para o container
COPY . .

# Etapa 6: Expor a porta (caso esteja rodando um servidor ou mock de GraphQL para testar)
# No caso de uma API de testes, isso pode ser opcional
# EXPOSE 4000

# Etapa 7: Definir o comando para rodar os testes
# Você pode usar o script de teste definido no package.json ou chamar diretamente Pactum
CMD ["npm", "test"]