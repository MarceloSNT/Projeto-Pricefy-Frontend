# Pricefy Frontend

Aplicação web desenvolvida para consumo da API Pricefy, permitindo ao usuário gerenciar mercados, produtos e preços, além de gerar listas de compras otimizadas com base no menor custo.

## Deploy

Aplicação online:  
https://project-pricefy.netlify.app

## Sobre o projeto

O Pricefy Frontend é a interface do sistema Pricefy, permitindo interação com a API backend para cadastro e consulta de dados.

A aplicação oferece uma experiência simples e intuitiva para que o usuário possa comparar preços entre mercados e montar listas de compras mais econômicas.

## Funcionalidades

- Cadastro de mercados  
- Cadastro de produtos  
- Registro de preços por mercado  
- Visualização e comparação de preços  
- Geração de lista de compras otimizada  
- Autenticação de usuário  
- Consumo de API protegida com JWT  

## Autenticação

A aplicação utiliza autenticação baseada em JWT integrada com o backend.

Fluxo básico:

1. Usuário realiza login  
2. Recebe um token JWT da API  
3. O token é armazenado no navegador  
4. O token é enviado automaticamente nas requisições protegidas  

## Tecnologias

- HTML  
- CSS  
- JavaScript  
- Consumo de API REST  
- Integração com backend em Spring Boot  
- Deploy em nuvem (Netlify)  

## Como rodar o projeto

### Pré-requisitos

- Navegador web moderno  
- Backend da API rodando (ou utilizar o deploy)

### Executando

- git clone https://github.com/MarceloSNT/Projeto-Pricefy-Frontend.git
- cd Projeto-Pricefy-Frontend

- Abra o arquivo index.html no navegador
ou utilize uma extensão como Live Server no VS Code.

##Integração com API

- A aplicação consome a API disponível em:
https://github.com/MarceloSNT/Projeto-Pricefy-Backend

Autor

Marcelo dos Santos Machado

GitHub: https://github.com/MarceloSNT
