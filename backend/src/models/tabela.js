const fs = require('fs');
const path = require('path');
const { FastReply } = require('../models');

// Função para salvar o arquivo no sistema de arquivos
function saveFile(fileContent, fileName, directory) {
  const dirPath = path.join(__dirname, directory);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = path.join(dirPath, fileName);
  fs.writeFileSync(filePath, fileContent);
  return filePath;
}

// Função para inserir o caminho do arquivo na tabela
async function insertFilePath(filePath) {
  await FastReply.create({ file_path: filePath });
}

// Exemplo de uso
const fileContent = Buffer.from("Conteúdo do arquivo");
const fileName = "example.txt";
const directory = "backend/public";

(async () => {
  // Salvar o arquivo
  const filePath = saveFile(fileContent, fileName, directory);

  // Inserir o caminho do arquivo na tabela
  await insertFilePath(filePath);

  console.log(`Arquivo salvo em: ${filePath}`);
})();