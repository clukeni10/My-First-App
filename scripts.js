const inputNome = document.getElementById("nome");
const inputData = document.getElementById("data");
const fileInput = document.getElementById("upload");

document.getElementById('save').addEventListener('click', function(){
    
    let nomes = JSON.parse(localStorage.getItem('nomes')) || [];
    let datas = JSON.parse(localStorage.getItem('datas')) || [];

    // Adicionar novo nome e data ao array
    nomes.push(inputNome.value);
    datas.push(inputData.value);

    // Armazenar de volta no localStorage
    localStorage.setItem('nomes', JSON.stringify(nomes));
    localStorage.setItem('datas', JSON.stringify(datas));

    inputNome.value = '';
    inputData.value = '';

});

document.getElementById('button').addEventListener('click', function(){
    show();
});



document.getElementById('upload').addEventListener('change', function(event){
    const file = event.target.files[0];

    if (file){
        const reader = new FileReader();

        reader.onloadend = function (){
            let imagens = JSON.parse(localStorage.getItem('imagens')) || [];
            imagens.push(reader.result);
            localStorage.setItem('imagens', JSON.stringify(imagens));

            const imgContainer = document.getElementById('preview');
            const img = document.createElement('img');
            img.src = reader.result;
            img.style.display = 'block';
            img.style.maxWidth = '200px';
            img.style.marginTop = '10px';
            imgContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Por favor, escolha um arquivo de imagem.');
    }
});

function calcularIdade(dataNascimento){
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())){
        idade--;
    }
    return idade;
}



function show(){
    const nomesSalvos = JSON.parse(localStorage.getItem('nomes')) || [];
    const datasSalvas = JSON.parse(localStorage.getItem('datas')) || [];
    const imagens = JSON.parse(localStorage.getItem('imagens')) || [];

    const listaNomes = document.getElementById('nomesSalvos');
    listaNomes.innerHTML = '';
    nomesSalvos.forEach((nome, index) => {
        const idade = calcularIdade(datasSalvas[index]);
        listaNomes.innerHTML +=` <li>Nome: ${nome} - Idade: ${idade} anos</li>`
    });

    const listaDatas = document.getElementById('datasSalvas');
    listaDatas.innerHTML = '';
    datasSalvas.forEach(data => {
        listaDatas.innerHTML += `<li>Data de nascimento: ${data}</li>`;
    });

        const imgContainer = document.getElementById('preview');
        imgContainer.innerHTML = '';
            imagens.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.style.display = 'block';
                img.style.maxWidth = '150px';
                img.style.maxHeight = '150px';
                img.style.marginTop = '10px';
                img.style.borderRadius = '5px';
                imgContainer.appendChild(img);
            });

        
    }






document.getElementById('reset').addEventListener('click', function (){
    inputNome.value = '';
    inputData.value = '';
    fileInput.value = '';
    localStorage.clear();

    document.getElementById('nomesSalvos').innerHTML = '';
    document.getElementById('datasSalvas').innerHTML = '';
    document.getElementById('preview').innerHTML = '';

});


window.onload = function (){
    show();
}

/*
window.onload = function() {
    const nomesSalvos = JSON.parse(localStorage.getItem('nomes')) || [];
    const datasSalvas = JSON.parse(localStorage.getItem('datas')) || [];

    // Exibir todos os nomes e datas salvos
    if (nomesSalvos.length > 0) {
        document.getElementById('nomesSalvos').innerHTML = nomesSalvos.map(nome => `<li>${nome}</li>`).join('');
    }
    if (datasSalvas.length > 0) {
        document.getElementById('datasSalvas').innerHTML = datasSalvas.map(data => `<li>${data}</li>`).join('');
    }
};


document.getElementById('save').addEventListener('click', function() {
    const fileInput = document.getElementById('upload');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onloadend = function() {
            // Armazenar a imagem em Local Storage
            let imagens = JSON.parse(localStorage.getItem('imagens')) || [];
            imagens.push(reader.result);
            localStorage.setItem('imagens', JSON.stringify(imagens));
        }

        // Converter a imagem para Base64
        reader.readAsDataURL(file);
    } else {
        alert('Por favor, escolha um arquivo de imagem.');
    }
});

const button = document.getElementById("button");
button.addEventListener('click', show());

function show() {
    // Recuperar as imagens do Local Storage
    const imagens = JSON.parse(localStorage.getItem('imagens')) || [];
    const imgContainer = document.getElementById('preview');
    imgContainer.innerHTML = ''; // Limpar imagens anteriores

    if (imagens.length > 0) {
        imagens.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.style.display = 'block';
            imgContainer.appendChild(img);
        });
    }

    const nomesSalvos = JSON.parse(localStorage.getItem('nomes')) || [];
    const datasSalvas = JSON.parse(localStorage.getItem('datas')) || [];

    if (nomesSalvos.length > 0) {
        document.getElementById('nomesSalvos').innerHTML = nomesSalvos.map(nome => `<li>${nome}</li>`).join('');
    }
    if (datasSalvas.length > 0) {
        document.getElementById('datasSalvas').innerHTML = datasSalvas.map(data => `<li>${data}</li>`).join('');
    }
}

function resetarDados() {
    input.value = '';
    input2.value = '';
    localStorage.clear();

    const imgContainer = document.getElementById('preview');
    imgContainer.innerHTML = ''; // Limpar as imagens
    document.getElementById('nomesSalvos').innerHTML = '';
    document.getElementById('datasSalvas').innerHTML = '';
}

document.getElementById('reset').addEventListener('click', resetarDados);
*/