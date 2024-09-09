const FormExtension = {
  name: "Forms",
  type: "response",
  match: ({ trace }) =>
    trace.type === "Custom_Form" || trace.payload.name === "Custom_Form",
  render: ({ trace, element }) => {
    const formContainer = document.createElement("form");

    formContainer.innerHTML = `
        <style>
          label {
            font-size: 0.8em;
            color: #888;
          }
          input[type="text"], input[type="email"] {
            width: 100%;
            border: none;
            border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
            background: transparent;
            margin: 5px 0;
            outline: none;
            padding: 8px 0;
          }
          .invalid {
            border-color: red;
          }
          .submit {
            background: linear-gradient(to right, #2e6ee1, #2e7ff1);
            border: none;
            color: white;
            padding: 10px;
            border-radius: 5px;
            width: 100%;
            cursor: pointer;
          }
          .budget-options {
            margin: 10px 0;
          }
        </style>
  
        <label for="name">Name</label>
        <input type="text" class="name" name="name" required><br><br>
  
        <label for="email">Email</label>
        <input type="email" class="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" title="Invalid email address"><br><br>
  
        <label for="budget">Budget</label>
        <div class="budget-options">
          <input type="radio" id="less50k" name="budget" value="Less than INR 50,000" required>
          <label for="less50k">Less than INR 50,000</label><br>
  
          <input type="radio" id="midrange" name="budget" value="INR 50,000 - INR 1,50,000" required>
          <label for="midrange">INR 50,000 - INR 1,50,000</label><br>
  
          <input type="radio" id="more150k" name="budget" value="More than INR 1,50,000" required>
          <label for="more150k">More than INR 1,50,000</label><br>
        </div>
  
        <input type="submit" class="submit" value="Submit">
      `;

    formContainer.addEventListener("input", function () {
      const name = formContainer.querySelector(".name");
      const email = formContainer.querySelector(".email");

      if (name.checkValidity()) name.classList.remove("invalid");
      if (email.checkValidity()) email.classList.remove("invalid");
    });

    formContainer.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = formContainer.querySelector(".name");
      const email = formContainer.querySelector(".email");
      const budget = formContainer.querySelector(
        'input[name="budget"]:checked'
      );

      if (!name.checkValidity() || !email.checkValidity() || !budget) {
        name.classList.add("invalid");
        email.classList.add("invalid");
        return;
      }

      formContainer.querySelector(".submit").remove();

      window.voiceflow.chat.interact({
        type: "complete",
        payload: {
          name: name.value,
          email: email.value,
          budget: budget.value,
        },
      });
    });

    element.appendChild(formContainer);
  },
};
