const parcelas483 = document.getElementById("parcelas483");
const parcelas241 = document.getElementById("parcelas241");

const valorPago = document.getElementById("valorPago");
const valorRestante = document.getElementById("valorRestante");
const barra = document.getElementById("barra");
const historico = document.getElementById("historico");

let lista = [];

function criarParcelas() {

    for (let i = 1; i <= 8; i++) {

        lista.push({
            numero: i,
            valor: 483,
            guilherme: false,
            giovanna: false
        });

    }

    for (let i = 1; i <= 8; i++) {

        lista.push({
            numero: i,
            valor: 241.50,
            guilherme: false,
            giovanna: false
        });

    }

    desenhar();

}

function desenhar(){

    parcelas483.innerHTML="";
    parcelas241.innerHTML="";

    lista.forEach((p,index)=>{

        let linha=`
        <tr class="${p.guilherme && p.giovanna ? 'status-pago':'status-pendente'}">

        <td>${p.numero}/8</td>

        <td>R$ ${p.valor.toFixed(2)}</td>

        <td>
        <input type="checkbox"
        ${p.guilherme?"checked":""}
        onchange="marcar(${index},'guilherme')">
        </td>

        <td>
        <input type="checkbox"
        ${p.giovanna?"checked":""}
        onchange="marcar(${index},'giovanna')">
        </td>

        <td>
        ${p.guilherme && p.giovanna ? "✅ Pago":"⏳ Pendente"}
        </td>

        </tr>
        `;

        if(p.valor==483){

            parcelas483.innerHTML+=linha;

        }else{

            parcelas241.innerHTML+=linha;

        }

    });

    atualizarResumo();

}

function marcar(index,pessoa){

    lista[index][pessoa]=!lista[index][pessoa];

    let agora=new Date().toLocaleString();

    historico.innerHTML=
    `<p>${agora} - ${pessoa} alterou a parcela ${lista[index].numero} de R$ ${lista[index].valor.toFixed(2)}</p>`
    +historico.innerHTML;

    atualizarResumo();

    desenhar();

}

function atualizarResumo(){

    let pago=0;

    lista.forEach(p=>{

        if(p.guilherme && p.giovanna){

            pago+=p.valor;

        }

    });

    const total=5796;

    valorPago.innerHTML="R$ "+pago.toFixed(2);

    valorRestante.innerHTML="R$ "+(total-pago).toFixed(2);

    barra.style.width=((pago/total)*100)+"%";

}

document.getElementById("marcarTudo").onclick=()=>{

    lista.forEach(p=>{

        p.guilherme=true;
        p.giovanna=true;

    });

    desenhar();

}

document.getElementById("desfazerTudo").onclick=()=>{

    lista.forEach(p=>{

        p.guilherme=false;
        p.giovanna=false;

    });

    desenhar();

}

document.getElementById("resetar").onclick=()=>{

    if(confirm("Deseja realmente apagar tudo?")){

        lista=[];

        criarParcelas();

        historico.innerHTML="";

    }

}

criarParcelas();

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};