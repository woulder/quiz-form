'use strict';

let currentTab = 0;


// refs
const quizFormCloseButton = $('#quiz-form-close');
const quizForm = $('#quiz-form-container');
const quizFormHeaderDescription = $('.quiz-form__form-header__description');
const quizFormContent = $('.quiz-form__main-content');
const quizFormProgressBar = document.getElementById('progress-bar');
const pageNumber = $('#page-number');
const formPrevBtn = $('#form-button-prev');
const formNextBtn = $('#form-button-next');


function showQuizForm() {
  quizForm.fadeIn('fast');
}

function hideQuizForm() {
  quizForm.fadeOut('fast');
}


//Close form click handlers
$(document).on('click', "#quiz-form-container", function (e) {
  e.stopPropagation();
  if (e.target.id === "quiz-form-container") {
    hideQuizForm();
  }
});

quizFormCloseButton.on("click", hideQuizForm);


// Changing 'next button' text
function setCorrectFormNextButtonText() {
  if (currentTab + 1 === quizFormContent.length) {
    formNextBtn.text('Получить предложение');
  } else if (currentTab + 1 === quizFormContent.length - 1) {
    formNextBtn.text('Последний вопрос');
  } else {
    formNextBtn.text('Следующий вопрос');
  }
}

// switching between form headers description: default and last page
function setCorrectFormHeaderDescription() {

  let defaultFormHeaderDescription = /*html*/`
          <h4>
          <span class="icon-docs"></span>
          Ответьте на вопросы и наш эксперт подберет для вас подходящие объекты
        </h4>
        <span class="quiz-form__form-header__current-page-number" id='page-number'>${currentTab + 1}/${quizFormContent.length - 1}</span>
  `;

  let lastFormPageHeaderTemplate = `<h1>Оставьте заявку и наш эксперт свяжется с Вами для уточнения деталей и отправит презентацию подходящих объектов</h1>`;

  if (currentTab + 1 === quizFormContent.length) {
    quizFormHeaderDescription.html(lastFormPageHeaderTemplate)
  } else {
    quizFormHeaderDescription.html(defaultFormHeaderDescription);

  }
}



function validateForm() {
  $('#quiz-form').validate({

  })
}

// next page button handler
formNextBtn.click(function () {

  if (currentTab + 1 >= quizFormContent.length) {

    //submit action by click on the last tab
    submitHandler();
    return;
  }

    // filling progress bar
  quizFormProgressBar.value += 10;

  // changing tabs
  quizFormContent.eq(currentTab).css('display', 'none');
  ++currentTab;
  setCorrectFormHeaderDescription();
  setCorrectFormNextButtonText();

  quizFormContent.eq(currentTab).css('display', 'block');

    // enabling 'previous page' button
  if (currentTab) {
    formPrevBtn.removeClass('disabled');
    formPrevBtn.attr('disabled', false);
  }

});




// previous page button handler
formPrevBtn.click(function () {

  if (!currentTab) return;


   //progress bar unfilled
  quizFormProgressBar.value -= 10;

  // changing tabs
  quizFormContent.eq(currentTab).css('display', 'none');
  --currentTab;
  setCorrectFormHeaderDescription();
  setCorrectFormNextButtonText();

  quizFormContent.eq(currentTab).css('display', 'block');


  // disabling 'previous button' on first tab
  if (!currentTab) {
    formPrevBtn.addClass('disabled');
    formPrevBtn.attr('disabled', true);
  }

});


function submitHandler() {

  (function ($) {
    $.fn.getFormData = function () {
      var data = {};
      var dataArray = $(this).serializeArray();
      for (var i = 0; i < dataArray.length; i++) {
        data[dataArray[i].name] = dataArray[i].value;
      }
      return data;
    }
  })(jQuery);

  let formData = {
    data: $('#quiz-form').getFormData()
  };

  console.log(formData);
}
