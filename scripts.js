
const input = document.getElementById("nome");
const input2 = document.getElementById("data");
var idade = 0;



function display(){
      localStorage.setItem( 'nome' , input.value);
      localStorage.setItem('data', input2.value);
}


      window.onload = function() {
      const nomeSalvo = localStorage.getItem('nome');
      const dataSalva = localStorage.getItem('data');

      

      if (nomeSalvo) {
        input.value = nomeSalvo;  
    }
    if (dataSalva) {
        input2.value = dataSalva;  
    }
    };

    function apagar(){
      localStorage.clear();

    }
    

    document.getElementById('save').addEventListener('click', function() {
      const fileInput = document.getElementById('upload');
      const file = fileInput.files[0];
  
      if (file){
          const reader = new FileReader();
          
          reader.onloadend = function() {
              // Armazenar a imagem em Local Storage
              localStorage.setItem('myImage', reader.result);
             
          }
          
          // Converter a imagem para Base64
          reader.readAsDataURL(file);
      } else {
          alert('Por favor, escolha um arquivo de imagem.');
      }
  });
  
  
    const button = document.getElementById("button");
    button.addEventListener('click', show);
    
    function show(){
      // Recuperar a imagem do Local Storage
      const imageData = localStorage.getItem('myImage');

      if (imageData) {
          const img = document.getElementById('preview');
          img.src = imageData;
          img.style.display = 'block'; 
      } 


    const nomeSalvo = localStorage.getItem('nome');
    const dataSalva = localStorage.getItem('data');
    
    if (nomeSalvo) {
        document.getElementById('nomeusr').textContent = `Olá, o seu nome é: ${nomeSalvo}`;  
    }
    if (dataSalva) {
        document.getElementById('datadenascimento').textContent = `A sua data de nascimento é: ${dataSalva}`;  
    }

    if (dataSalva) {
      const idade = calcularIdade(dataSalva); // Passar dataSalva em vez de input2.value
      document.getElementById('idade').textContent = `Por isso tem: ${idade} anos`;
  }

  function calcularIdade(dataSalva) {
    const hoje = new Date();
    const nascimento = new Date(dataSalva);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    // Ajustar se o aniversário ainda não aconteceu neste ano
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade;
}

}


function resetarDados() {

  input.value = '';
  input2.value = '';
  

  localStorage.clear();
 
  

  const img = document.getElementById('preview');
  img.style.display = 'none';
  document.getElementById('nomeusr').textContent = '';
  document.getElementById('datadenascimento').textContent = '';
  document.getElementById('idade').textContent = '';
}


document.getElementById('reset').addEventListener('click', resetarDados);

