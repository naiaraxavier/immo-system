// Carregando o Google Charts
google.charts.load('current', { packages: ['corechart', 'bar', 'table'] });
google.charts.setOnLoadCallback(drawCharts);

const URL_PAYMENTS_SUMMARY = 'http://localhost:3001/api/payments-summary';
const URL_SALES_BY_MONTH = 'http://localhost:3001/api/sales-by-month';
const URL_PROPERTY_TYPE_PERCENTAGE = 'http://localhost:3001/api/property-type-percentage';

// Função para buscar dados da API
const dataAPI = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro na resposta da API:', error);
    return [];
  }
};

// Função para desenhar todos os gráficos
async function drawCharts() {
  try {
    // Gráfico de Barras: Total acumulado de pagamentos por imóvel
    const paymentsData = await dataAPI(URL_PAYMENTS_SUMMARY);
    const barData = new google.visualization.DataTable();
    barData.addColumn('string', 'Property');
    barData.addColumn('number', 'Total Payment');
    paymentsData.forEach((item) => {
      barData.addRow([item.code_property, parseFloat(item.total_payment)]);
    });

    const barOptions = {
      title: 'Total Acumulado de Pagamentos por Imóvel',
      hAxis: { title: 'Pagamento Total (R$)', minValue: 0 },
      vAxis: { title: 'Código do Imóvel' },
      legend: { position: 'none' },
    };
    const barChart = new google.visualization.BarChart(document.getElementById('barchart_div'));
    barChart.draw(barData, barOptions);

    //Tabela de relação entre código da propriedade e descrição
    const tableData = new google.visualization.DataTable();
    tableData.addColumn('string', 'Código');
    tableData.addColumn('string', 'Descrição');
    paymentsData.forEach((item) => {
      tableData.addRow([item.code_property, item.property_description]);
    });

    const table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(tableData);

    // Gráfico de Linhas: Total de vendas por mês/ano
    const salesData = await dataAPI(URL_SALES_BY_MONTH);
    const lineData = new google.visualization.DataTable();
    lineData.addColumn('string', 'Month/Year');
    lineData.addColumn('number', 'Total Sales');
    salesData.forEach((item) => {
      lineData.addRow([item.month_year, parseFloat(item.total_payment)]);
    });

    const lineOptions = {
      title: 'Total de Vendas por Mês/Ano',
      hAxis: { title: 'Mês/Ano' },
      vAxis: { title: 'Total de Vendas (R$)' },
      legend: { position: 'none' },
      curveType: 'function',
    };
    const lineChart = new google.visualization.LineChart(document.getElementById('linechart_div'));
    lineChart.draw(lineData, lineOptions);

    // Gráfico de Pizza: Percentual de vendas por modalidade de imóvel
    const propertyData = await dataAPI(URL_PROPERTY_TYPE_PERCENTAGE);
    const pieData = new google.visualization.DataTable();
    pieData.addColumn('string', 'Property Type');
    pieData.addColumn('number', 'Percentage');
    propertyData.forEach((item) => {
      pieData.addRow([item.property_type_name, parseFloat(item.percentage)]);
    });

    const pieOptions = {
      title: 'Percentual de Vendas por Tipo de Imóvel',
      pieSliceText: 'percentage',
      legend: { position: 'right' },
    };
    const pieChart = new google.visualization.PieChart(document.getElementById('piechart_div'));
    pieChart.draw(pieData, pieOptions);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}
