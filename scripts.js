const nome = document.getElementById("nome");
const data = document.getElementById("data");
const imagem = document.getElementById("Imagem");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const img = document.getElementById("imgusr");


nome.addEventListener("keyup", display);
data.addEventListener("keyup", display2);


function display(){
      h2.innerHTML = nome.value;
}

function display2(){
      h3.innerHTML = data.value;
}

imagem.addEventListener('change', function(event) {
      const arquivo = event.target.files[0];
      if (arquivo) {
        const leitor = new FileReader();
        
        leitor.onload = function(e) {
          imgusr.src = e.target.result;
          imgusr.style.display = 'block';
        }

        leitor.readAsDataURL(arquivo);
      }
    });
          

