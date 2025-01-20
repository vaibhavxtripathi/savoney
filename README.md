# Savoney (Clone)

Savoney Tracker is a web application designed to help you manage your finances efficiently. With features like income tracking, expense tracking, budget allocation, and visual analytics (charts and progress bars), it provides an intuitive interface to gain better control over your money.

![image](https://github.com/user-attachments/assets/d61cdb90-600c-4c87-928a-9671d97f1a3a)

## Features

- **Income Tracking:** Log income entries with details such as amount, date, and remarks.
- **Expense Tracking:** Track your expenses categorized by budgets and see how much you've spent.
- **Budget Allocation:** Allocate budgets and manage expenses under those budgets with progress bars to monitor usage.
- **Interactive Charts:** Visualize your income and expense sources using dynamic doughnut charts.
- **Persistent Data:** All data (income, expenses, budgets, charts, and progress bars) is stored in localStorage, ensuring it remains intact even after a page reload.

## Technologies Used

- **HTML:** Structure of the web app.
- **CSS:** Styling and layout.
- **JavaScript:** Core logic for handling forms, charts, and data storage.
- **Chart.js:** For rendering income and expense doughnut charts.
- **ProgressBar.js:** For displaying and managing budget progress bars.
- **AOS (Animate On Scroll):** Adds animation effects on scroll.

## How to Use

1. Clone or download this repository to your local machine.
2. Open `index.html` in your browser.
3. Use the following forms and sections:
   - **Income Form:** Add your income details (amount, date, remarks).
   - **Budget Form:** Create budgets with specific allocation amounts.
   - **Expense Form:** Log expenses against a budget.
4. View the real-time updates to your total balance, total income, and total expenses.
5. Analyze your financial data using the charts and progress bars.

## Project Structure

```
.
├── index.html          # Main HTML file
├── style.css           # Styles for the web app
├── script.js           # JavaScript file containing logic
├── README.md           # Project documentation
```

## Installation

To run this project locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/budget-tracker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd budget-tracker
   ```
3. Open `index.html` in your preferred browser.

## Local Storage

This application uses `localStorage` to save data, ensuring that your entries persist across page reloads. The following items are stored:

- Income entries (amount, date, and remarks).
- Expense entries (amount, date, remarks, and budget type).
- Budget details (progress and allocations).
- Chart data for income and expenses.

## Known Issues

- Ensure that valid values are entered in the forms (e.g., non-negative numbers for amounts).
- Reloading the page might not immediately display changes in progress bars if data is incorrectly stored in localStorage.

## Future Improvements

- Add authentication to save data securely to the cloud.
- Enable exporting data as CSV or PDF.
- Add advanced analytics and filters for a detailed financial overview.

## Contributing

Contributions are welcome! Please fork this repository and create a pull request for review.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
