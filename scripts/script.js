async function buscarEndereco(cep){
    const messageErro = document.getElementById('erro');
    messageErro.innerHTML = "";

    try {
        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaCEPJson = await consultaCEP.json();

        if(consultaCEPJson.erro) {
            throw Error('CEP não existente!');
        };

        preencherEndereco(
            consultaCEPJson.logradouro, 
            consultaCEPJson.bairro,
            consultaCEPJson.localidade,
            consultaCEPJson.uf,
        );

        return consultaCEPJson;
    } catch (erro) {
        messageErro.innerHTML = `
            <p>CEP inválido. Tente novamente!</p>
        `;
        console.log(erro);
    } finally {
        console.log('Processamento concluído!');
    };
};

const cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscarEndereco(cep.value));

function preencherEndereco (endereco, bairro, cidade,  estado) {
    document.getElementById('endereco').value = endereco;
    document.getElementById('bairro').value = bairro;
    document.getElementById('cidade').value = cidade;
    document.getElementById('estado').value = estado;    
}