
const input = document.getElementById("nome");
const input2 = document.getElementById("data");






function display(){
      localStorage.setItem( 'nome' , input.value);
      localStorage.setItem('data', input2.value);



}


      window.onload = function() {
      const nomeSalvo = localStorage.getItem('nome');
      const dataSalva = localStorage.getItem('data');

      

      if (nomeSalvo) {
        document.getElementById('nome') == nomeSalvo;
      }
      if (dataSalva) {
        document.getElementById('data') == dataSalva;
      }
    };

    function apagar(){
      localStorage.clear();
    }
    
    function salvarImagem() {
      const input = document.getElementById('inputImagem');
      const ficheiros = input.ficheiros[0];

      if (ficheiros) {
        const reader = new FileReader();

        reader.onload = function(event) {
          const base64String = event.target.result;
          localStorage.setItem('imagemSalva', base64String);
          alert('Imagem salva com sucesso!');
          exibirImagem(base64String);  // Exibir imagem imediatamente após salvar
        };

        reader.readAsDataURL(ficheiros); // Converte o arquivo em base64
      } else {
        alert('Nenhuma imagem selecionada.');
      }
    }

    /* Função para exibir a imagem
    function exibirImagem(base64String) {
      const imagemExibida = document.getElementById('imagemExibida');
      imagemExibida.src = base64String;
    }

*/
   
    window.onload = function() {
      const imagemSalva = localStorage.getItem('imagemSalva');
      if (imagemSalva) {
        exibirImagem(imagemSalva);
      }
    };




          

