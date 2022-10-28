/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
   renderAccountsList() {
    Account.list(null, (err, response) => {
      if (response && response.success) {
        this.element.querySelector(".accounts-select").innerHTML = response.data.reduce((sumValue, currentValue) => {
          sumValue += `<option value="${currentValue.id}">${currentValue.name}</option>`;
          return sumValue;
        }, '');
      };
    });
  };

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        const type = data.type;
        App.getModal('new' + type[0].toUpperCase()+ type.slice(1)).close();
        App.update();
      }
    });
  }
}