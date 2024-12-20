const inputNome = document.getElementById("nome");
const inputData = document.getElementById("data");
const fileInput = document.getElementById("upload");

// Chamar show() ao carregar a página
window.onload = function () {
    show();
};

// Função para salvar dados no localStorage
function save() {
    let nomes = JSON.parse(localStorage.getItem('nomes')) || [];
    let datas = JSON.parse(localStorage.getItem('datas')) || [];
    let imagens = JSON.parse(localStorage.getItem('imagens')) || [];

    // Adicionar nome e data ao array
    nomes.push(inputNome.value);
    datas.push(inputData.value);

    // Armazenar no localStorage
    localStorage.setItem('nomes', JSON.stringify(nomes));
    localStorage.setItem('datas', JSON.stringify(datas));

    // Resetar os inputs
    inputNome.value = '';
    inputData.value = '';

    // Verificar se uma imagem foi carregada
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onloadend = function () {
            const id = imagens.length ? imagens[imagens.length - 1].id + 1 : 1;
            imagens.push({ id, url: reader.result });
            localStorage.setItem('imagens', JSON.stringify(imagens));
           // Atualizar a exibição
        };
        reader.readAsDataURL(file);
        
    } else {
        alert('Por favor, escolha um arquivo de imagem.');
    }
    show(); 
}

// Função para exibir os dados na tabela
function show() {
    const nomesSalvos = JSON.parse(localStorage.getItem('nomes')) || [];
    const datasSalvas = JSON.parse(localStorage.getItem('datas')) || [];
    const imagens = JSON.parse(localStorage.getItem('imagens')) || [];

    const corpoTabela = document.getElementById('corpoTabela');
    corpoTabela.innerHTML = '';  // Limpar a tabela anterior

    nomesSalvos.forEach((nome, index) => {
        const idade = calcularIdade(datasSalvas[index]);
        const imgUrl = imagens[index] ? imagens[index].url : '';

        // Criar nova linha na tabela
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${nome}</td>
            <td>${datasSalvas[index]}</td>
            <td>${idade} anos</td>
            <td>
                <img src="${imgUrl}" 
                     style="max-width: 100px; max-height: 100px; border-radius: 5px;" />
 
            </td>
        ;

            <td><button class="Delete" onclick="dele(${index})">Deletar</button></td>
        `;

        corpoTabela.appendChild(novaLinha);
    });
}

function dele(index){
    let nomes = JSON.parse(localStorage.getItem('nomes')) || [];
    let datas = JSON.parse(localStorage.getItem('datas')) || [];
    let imagens = JSON.parse(localStorage.getItem('imagens')) || [];

    // Remover os itens pelo índice
    nomes.splice(index, 1);
    datas.splice(index, 1);
    imagens.splice(index, 1);

    // Atualizar o localStorage
    localStorage.setItem('nomes', JSON.stringify(nomes));
    localStorage.setItem('datas', JSON.stringify(datas));
    localStorage.setItem('imagens', JSON.stringify(imagens));

    // Atualizar a exibição
    show();
}

// Função para calcular a idade
function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
}

// Evento de clique para salvar dados
document.getElementById('save').addEventListener('click', function () {
    save();
});

// Evento de clique para resetar os dados
document.getElementById('reset').addEventListener('click', function () {
    inputNome.value = '';
    inputData.value = '';
    fileInput.value = '';
    localStorage.clear();

    document.getElementById('corpoTabela').innerHTML = '';
}); 