@echo off
title Iniciando Servidor Node.js
color 0A

:: Navega até a pasta do projeto
cd /d "H:\projeto unisal\unisal Projeto 10\ferreiras_petshop"

:: Mata processos na porta 3000 (opcional, descomente se necessário)
:: taskkill /IM node.exe /F

:: Inicia o servidor
start "Servidor Node.js" cmd /k "node assets/js/server.js"

:: Abre o navegador (aguarda 2 segundos para o servidor iniciar)
timeout /t 2 >nul


echo Servidor iniciado! Acesse: http://localhost:3000
pause