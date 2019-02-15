var selid = 0;
var percent = 0;
var progprec = 100 / question.length;
var progressbar = progprec;
var indquest = 0;
document.addEventListener("DOMContentLoaded", function()
{
   /* for(let i in question){
        console.log('question ' + question[i].question)
        for(let j in question[i].answer){
            console.log(question[i].answer[j]);
        }
    }*/

    TestInHtml();
    document.querySelector('#Next').onclick = function () {
        if(indquest <= question.length - 1){
            if(question[indquest].type === "choice") {
                if (selid) {
                    if (selid === question[indquest].correct) {
                        percent += progprec;
                    }
                    else {
                        percent += 0;
                    }
                    question[indquest].selected = selid;
                    document.querySelector('.progress-bar').style.width = progressbar + '%';
                    progressbar += progprec;
                    indquest++;
                    if (indquest > question.length - 1) {
                        FinishTest();
                    } else {
                        TestInHtml();
                    }
                    selid = 0;
                }
                else {
                    alert('Выберите ответ!')
                }
            } else {
                //let idq = document.querySelector('input[name=answer]').id;
                let value = document.querySelector('input[name=answer]').value;
                if(value){
                    if (value.toLowerCase() === question[indquest].correct.toLowerCase()) {
                        percent += progprec;
                    }
                    else {
                        percent += 0;
                    }
                    question[indquest].selected = value;
                    document.querySelector('.progress-bar').style.width = progressbar + '%';
                    progressbar += progprec;
                    indquest++;
                    if (indquest > question.length - 1) {
                        FinishTest();
                    } else {
                        TestInHtml();
                    }
                } else {
                    alert('Введите ответ!');
                }
            }
        }
        else {
            FinishTest();
        }
    };
    document.querySelector('#Reset').disabled = true;
    document.querySelector('#Reset').onclick = ResetTest;
/*    function SelectAnswer(){
        //let ids = e.path[0].id;
        //console.log(ids);
        //e.path[0].classList.add("active");
        console.log('1')
    }*/
});

function ResetTest(){
    selid = 0;
    percent = 0;
    progprec = 100 / question.length;
    progressbar = progprec;
    indquest = 0;
    document.querySelector('.progress-bar').style.width = 0;
    document.querySelector('#Next').disabled = false;
    document.querySelector('#Reset').disabled = true;
    document.querySelector('#Result').hidden = true;
    document.querySelector('#results').innerHTML = '';
    TestInHtml();
}

function FinishTest() {
    document.querySelector('.progress-bar').style.width = progressbar + '%';
    document.querySelector('#Next').disabled = true;
    document.querySelector('#Reset').disabled = false;
    document.querySelector('#Result').hidden = false;
    document.querySelector('#question').innerHTML = 'Тест завершен!';
    document.querySelector('#answer').innerHTML = '';
    document.querySelector('#Result').onclick = OutRes;
    //alert('Тест закончен! Вы набрали ' + Math.round(percent) + '%')
}
function OutRes() {
    //alert('Тест закончен! Вы набрали ' + Math.round(percent) + '%');
    let s = '';
    if(percent >= 65) {
        s += `<div style="border: 1px solid gray; border-radius:5px; background-color:#00ff3a;padding: 10px;">
                Тест закончен! Вы набрали ${Math.round(percent)}%
             </div>`;
    }else if (percent > 40 && percent < 65) {
        s += `<div style="border: 1px solid gray; border-radius:5px; background-color:#f37203;padding: 10px;">
                Тест закончен! Вы набрали ${Math.round(percent)}%
             </div>`;
    }else {
        s += `<div style="border: 1px solid gray; border-radius:5px; background-color:#ff0d0d;padding: 10px;">
                Тест закончен! Вы набрали ${Math.round(percent)}%
             </div>`;
    }
    //let select = 0;
    for(let i in question){
        if(question[i].type === 'choice') {
            s += `<div id="question" style="border: 1px solid gray; padding: 20px; background: aqua; border-radius: 5px">
                        Вопрос ${i-0+1}
                    </div>
                    <ul class='list-group'>`;
            if(question[i].correct === question[i].selected) {
                for (let j in question[i].answer) {
                    if (j-0 === question[i].selected) {
                        s += `<li class='list-group-item list-group-item-success' id="${j}">  ${j}) ` + question[i].answer[j];
                        s += " <span style=\"float:right\">Верно!</span></li>";
                    } else {
                        s += `<li class='list-group-item' id="${j}">  ${j}) ` + question[i].answer[j];
                        s += " </li>";
                    }
                }
            }else{//(question[i].correct !== question[i].selected){
                for (let j in question[i].answer){
                    if(j-0 === question[i].correct){
                        s += `<li class='list-group-item list-group-item-dark' id="${j}">  ${j}) ` + question[i].answer[j];
                        s += " <span style=\"float:right\">Правильный ответ!</span></li>";
                        //select = question[i].selected;
                    }else if(j-0 === question[i].selected) {
                        s += `<li class='list-group-item list-group-item-danger' id="${j}">  ${j}) ` + question[i].answer[j];
                        s += " <span style=\"float:right\">Не верно!</span></li>";
                    }else {
                        s += `<li class='list-group-item' id="${j}">  ${j}) ` + question[i].answer[j];
                        s += " </li>";
                    }
                }
            }
               /*if(i === select){
                   s += `<li class='list-group-item list-group-item-danger' id="${j}">  ${j}) ` + question[i].answer[j];
                   s += " </li>";
               }else
               {
                   s += `<li class='list-group-item' id="${j}">  ${j}) ` + question[i].answer[j];
                   s += " </li>";
               }*/
            //}
            s += "</ul><br>";
        }else {
            s+= `<div id="question" style="border: 1px solid gray; padding: 20px; background: aqua; border-radius: 5px">
                        Вопрос ${i-0+1}
                    </div>
                    <ul class='list-group'>`;
            if(question[i].correct === question[i].selected){
                s += `<li class='list-group-item list-group-item-success'>` + question[i].correct;
                s += " <span style=\"float:right\">Верно!</span></li>";
            }else{
                s += `<li class='list-group-item list-group-item-danger'>` + question[i].correct;
                s += " <span style=\"float:right\">Не верно!</span></li>";
            }
            s+= '</ul><br>';
        }

    }

    document.querySelector('#results').innerHTML = s;
}
function TestInHtml() {

    let s = "<ul class='list-group'>";
    document.querySelector('#question').innerHTML = `Вопрос ${indquest + 1}: ` + question[indquest].question;
    if(question[indquest].type === "choice") {
        //let cv = 0;
        for (let i in question[indquest].answer) {

            s += `<li class='list-group-item' id="${i}">  ${i}) ` + question[indquest].answer[i];
            s += " </li>"

        }
    }else {
        s += `<input type="text" name="answer" id="${indquest}"/>`;
    }
    s += "</ul>";
    document.querySelector('#answer').innerHTML = s;
    document.querySelectorAll("li").forEach(function (item) {

        item.onclick = function () {
            selid = item.id | 0;
            document.querySelectorAll("li").forEach(function (items) {
                items.classList.remove("active");
            });
            item.classList.add("active");
        };
    });
}

document.addEventListener("keydown", function (e) {
    if(e.keyCode === 123 || (e.shiftKey && e.ctrlKey && e.keyCode === 73)) {
        e.cancelable = true;
        e.stopPropagation();
        e.preventDefault();
        e.returnValue = false;
        alert('Запрещено!');
    }
},false);
document.addEventListener("keypress", function (e) {
    if(e.keyCode === 123) {
        e.cancelable = true;
        e.stopPropagation();
        e.preventDefault();
        e.returnValue = false;
        alert('Запрещено!');
    }
},false);
document.addEventListener("keyup", function (e) {
    if(e.keyCode === 123) {
        e.cancelable = true;
        e.stopPropagation();
        e.preventDefault();
        e.returnValue = false;
        alert('Запрещено!');
    }
},false);