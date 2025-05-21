/******************************************************************
 *  Скрипт «Employee Form»                                        *
 *  -------------------------                                     *
 *  • При загрузке страницы вешает обработчик на форму.           *
 *  • На submit собирает данные, валидирует обязательные поля.    *
 *  • Рендерит карточку-саммари справа от формы.                  *
 *  • После успешного сабмита сбрасывает форму.                   *
 ******************************************************************/

// Ждём полной загрузки DOM, прежде чем обращаться к элементам
document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------------------------------------------
   * 1. Кэшируем нужные элементы
   * ---------------------------------------------------------------- */
  const form = document.querySelector(".data-form"); // сама форма
  const infoCard = document.querySelector("#infoCard"); // блок-саммари

  /* ------------------------------------------------------------------
   * 2. Обработчик submit
   * ---------------------------------------------------------------- */
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // не даём браузеру перезагружать страницу

    /* --------------------------------------------------------------
     * 2.1. Считываем значения из инпутов
     *      trim() убирает лишние пробелы по краям строки
     * ------------------------------------------------------------ */
    const firstName = document.querySelector("#first_name").value.trim();
    const surname = document.querySelector("#surname").value.trim();
    const age = document.querySelector("#age").value.trim();
    const jobPosition = document.querySelector("#job_position").value.trim();

    /* --------------------------------------------------------------
     * 2.2. Мини-валидация: Name, Surname и Age обязательны
     *      Если хоть одно пустое — показываем alert и выходим
     * ------------------------------------------------------------ */
    if (!firstName || !surname || !age) {
      alert("Please fill in all required fields (Name, Surname, Age).");
      return; // прекращаем обработку submit
    }

    /* --------------------------------------------------------------
     * 2.3. Собираем HTML-шаблон карточки
     *      • Каждый пункт — отдельный .summary-item
     *      • «Job Position» добавляем, только если пользователь ввёл значение
     * ------------------------------------------------------------ */
    const summaryContent = `
      <h2 class="summary-title">Employee Summary</h2>

      <div class="summary-item">
        <span class="summary-label">Name</span>
        <span class="summary-value">${firstName}</span>
      </div>

      <div class="summary-item">
        <span class="summary-label">Surname</span>
        <span class="summary-value">${surname}</span>
      </div>

      <div class="summary-item">
        <span class="summary-label">Age</span>
        <span class="summary-value">${age}</span>
      </div>

      ${
        jobPosition
          ? `<div class="summary-item">
               <span class="summary-label">Job Position</span>
               <span class="summary-value">${jobPosition}</span>
             </div>`
          : "" // если поле пустое — ничего не вставляем
      }
    `;

    /* --------------------------------------------------------------
     * 2.4. Рендерим карточку и делаем её видимой
     * ------------------------------------------------------------ */
    infoCard.innerHTML = summaryContent; // вставляем HTML внутрь блока
    infoCard.classList.remove("hidden"); // убираем класс, который скрывал элемент

    /* --------------------------------------------------------------
     * 2.5. Сбрасываем форму, чтобы поля очистились
     * ------------------------------------------------------------ */
    form.reset();
  });
});
