/**
 * Run these on page load
 */
$( document ).ready(function() {

  /**
   * Toggle off-canvas z-index to avoid hidden alerts
   */
  $( 'body' ).on( 'opened.zf.offcanvas', function() {
    $( '#offCanvasRight' ).addClass( 'opened' );
  });
  $( 'body' ).on( 'closed.zf.offcanvas', function() {
    window.setTimeout( function() {
      $( '#offCanvasRight' ).removeClass( 'opened' );
    }, 500 );
  });


  /**
   * Initialize DataTables plugin (demo)
   */
  if ( $( '#individual-investments' ).length ) {
    $('#individual-investments-table').DataTable( {
      responsive: true
    } );
  }


  /**
   * Initialize Highcharts plugin (demo)
   */
  if ( $( '#spending-by-year-chart' ).length ) {

    var spendingByYear = new Highcharts.Chart({
      chart: {
        type: 'column',
        renderTo: 'spending-by-year-chart'
      },
      credits: {
        enabled: false
      },
      title: {
        text: null
      },
      xAxis: {
        categories: ['FY2011', 'FY2012', 'FY2013', 'FY2014', 'FY2015', 'FY2016', 'FY2017'],
        title: {
          text: 'Fiscal Year'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total IT Spending ($)',
          offset: 40,
          labels: {
            format: '{value}.0B'
          }
        }
      },
      tooltip: {
        formatter: function() {
          if ( this.total > 1 ) {
            total = '$' + this.total.toFixed(1) + 'B';
          } else {
            total = '$' + ( this.total.toFixed(1) * 1000 ) + 'M';
          }
          if ( this.point.y > 1 ) {
            ytotal = '$' + this.point.y.toFixed(1) + 'B';
          } else {
            ytotal = '$' + ( this.point.y * 1000 ).toFixed(1) + 'M';
          }
          pct = ( this.point.y / this.total ) * 100;
          tip = '<strong>' + this.x + '</strong><br>';
          tip += 'Total IT Spending: ' + total + '<br>';
          tip += '$ ' + this.series.name + ': ' + ytotal + '<br>';
          tip += '% ' + this.series.name + ': ' + pct.toFixed(1) + '%<br>';
          return tip;
        }
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            formatter: function() {
              if ( this.point.y > 1 ) {
                label = '$' + this.point.y.toFixed(1) + 'B';
              } else {
                label = '$' + ( this.point.y * 1000 ).toFixed(1) + 'M';
              }
              return label;
            }
          }
        }
      },
      series: [{
        name: 'Total IT Spending on Non-Major Investments',
        data: [1.3, 1.4, 1.8, 1.5, 1.5, 1.7, 1.5]
      }, {
        name: 'Total IT Spending on Major Investments',
        data: [1.1, 1.1, 0.7596, 1.2, 1.6, 1.7, 1.7]
      }]
    });

    var highlightsTotalSpendingChart = new Highcharts.Chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        renderTo: 'highlights-total-spending-chart'
      },
      credits: {
        enabled: false
      },
      title: {
        text: null
      },
      tooltip: {
        formatter: function() {
          tip = '<strong>' + this.point.name + ' (' + this.point.fullName + ')</strong><br>';
          tip += 'Percent: ' + this.point.y + '%<br>';
          tip += 'Dollars: $' + this.point.dollars;
          return tip;
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: false,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            distance: -40,
            format: '{point.y}'
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Percent',
        colorByPoint: true,
        innerSize: '50%',
        data: [{
          name: 'O&M',
          fullName: 'Operations & Maintenance',
          dollars: '2.7B',
          y: 78.6
        }, {
          name: 'DME',
          fullName: 'Development Modernization Enhancement',
          dollars: '636.7M',
          y: 18.6
        }, {
          name: 'Provisioned',
          fullName: 'Provisioned IT Services',
          dollars: '94.9M',
          y: 2.8
        }]
      }]
    });

  }

} );
