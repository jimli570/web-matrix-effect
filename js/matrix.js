document.addEventListener("DOMContentLoaded", function () {
  var g_fox =
    [
      "  .-.      .-.",
      "   |-.\ __ /.-|",
      "   \  `    `  /",
      "   / _     _  \\",
      "   | _`q  p _ |",
      "   `._=/  \\=_.`",
      "     [`\()/`]`\\",
      "     [      ]  \\",
      "     |[    ]    \\",
      "     \ '--'   .- \\",
      "     |-      /    \\",
      "     | | | | |     ;",
      "     | | |.;....__ |",
      "   .-``;`         `|",
      "  /    |           /",
      "  `-../____...---``"
    ]
  //console.log(fox)

  // Declare globals
  var g_canvasContainer;
  var g_canvasContainer2D;

  var g_matrixText;
  var g_matrixText_default = '0101ABCDEF';

  var g_fontSize;
  var g_fontSize_default = Math.max(10, Math.floor(document.getElementById('matrix').width / 20.0));

  var g_random;
  var g_random_default = 0.95;

  var g_textColor;
  var g_textColor_default = '00CC00';

  var g_backgroundColor;
  var g_backgroundColor_default = '0,0,0';

  var g_numOfMatrixColumns;
  var g_matrixColumnsHeight;

  getData() // Gets parameters from URL, or uses default
  initMatrix()

  setInterval(drawGraphics, 40)
  //drawFox()

  window.addEventListener('resize', () => {
    initMatrix();
  });


  function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1)
    var sURLVariables = sPageURL.split('&')

    for (var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] == sParam) {
        return sParameterName[1];
      }
    }

    return 'undefined';
  }

  function getData() {
    // matrixText
    var g_matrixText_tmp = GetURLParameter('matrixText');
    g_matrixText = (g_matrixText_tmp == 'undefined') ? g_matrixText_default : g_matrixText_tmp;
    g_matrixText = g_matrixText.split("");

    // fontSize 
    var g_fontSize_tmp = GetURLParameter('fontSize');
    g_fontSize = (g_fontSize_tmp == 'undefined') ? g_fontSize_default : g_fontSize_tmp;

    // random 
    var g_random_tmp = GetURLParameter('random');
    g_random = (g_random_tmp == 'undefined') ? g_random_default : g_random_tmp;

    // textColor
    var g_textColor_tmp = GetURLParameter('textColor')
    g_textColor = (g_textColor_tmp == 'undefined') ? g_textColor_default : g_textColor_tmp

    // backgroundColor 
    var g_backgroundColor_tmp = GetURLParameter('backgroundColor')
    g_backgroundColor = (g_backgroundColor_tmp == 'undefined') ? g_backgroundColor_default : g_backgroundColor_tmp
  }

  function initMatrix() {
    g_canvasContainer = document.getElementById("matrix")
    g_canvasContainer2D = g_canvasContainer.getContext("2d");

    g_canvasContainer.height = window.innerHeight
    g_canvasContainer.width = window.innerWidth

    g_numOfMatrixColumns = Math.floor(g_canvasContainer.width / g_fontSize)
    g_matrixColumnsHeight = new Array()

    // Initial position for each column
    for (var i = 0; i < g_numOfMatrixColumns; ++i) {
      g_matrixColumnsHeight.push(Math.floor(0.1 * Math.random() * (g_canvasContainer.height / g_fontSize)))
    }
  }

  function drawGraphics() {
    // 2D canvas style
    g_canvasContainer2D.fillStyle = 'rgba(' + g_backgroundColor + ' , 0.05)';
    g_canvasContainer2D.fillRect(0, 0, g_canvasContainer.width, g_canvasContainer.height);

    // g_canvasContainer2D.font = g_fontSize + 'px arial';
    g_canvasContainer2D.font = g_fontSize + 'px Courier New';

    // drawFox()
    drawText()
  }

  function drawText() {
    g_canvasContainer2D.fillStyle = "#" + g_textColor

    for (var i = 0; i < g_numOfMatrixColumns; ++i) {
      var columnText = g_matrixText[Math.floor(Math.random() * g_matrixText.length)];

      g_canvasContainer2D.fillText(columnText, i * g_fontSize, g_matrixColumnsHeight[i] * g_fontSize);
      ++g_matrixColumnsHeight[i];

      if (g_matrixColumnsHeight[i] * g_fontSize > g_canvasContainer.height || Math.random() > g_random) {
        //g_matrixColumnsHeight[i] = Math.floor(0.1 * Math.random() * (g_canvasContainer.height/g_fontSize))
        g_matrixColumnsHeight[i] = 0
      }
    }
  }

  function drawFox() {
    // Declare fox variables
    var fox_rows
    var fox_maxColumns = 0
    var fox_fontSize = 20
    var fox_avaibleColumns
    var fox_columnStart
    var fox_rowStart

    fox_rows = g_fox.length

    for (var i = 0; i < fox_rows; ++i) {
      if (g_fox[i].length > fox_maxColumns) {
        fox_maxColumns = g_fox[i].length
      }
    }

    fox_avaibleColumns = Math.floor(g_canvasContainer.width / fox_fontSize)
    fox_columnStart = Math.floor((fox_avaibleColumns * 0.5 - (fox_maxColumns / 2.0)) * fox_fontSize)
    fox_rowStart = Math.floor((g_canvasContainer.height / 3.0))

    /*
    console.log( "g_fox.length: " + g_fox.length)
    console.log( "fox_maxColumns: " + fox_maxColumns)
    console.log( "g_canvasContainer.width: " + g_canvasContainer.width)
    console.log( "g_canvasContainer.height: " + g_canvasContainer.height)
    console.log( "fox_avaibleColumns: " + fox_avaibleColumns)
    console.log( "fox_columnStart: " + fox_columnStart)
    console.log( "fox_rowStart: " + fox_rowStart) */

    //g_canvasContainer2D.fillStyle = "rgba(20,20,20 , 0.05)"
    //g_canvasContainer2D.fillRect(fox_columnStart, fox_rowStart - fox_fontSize, fox_maxColumns * fox_fontSize, (fox_rows+1) * fox_fontSize);

    g_canvasContainer2D.fillStyle = "#" + "850000"

    for (var i = 0; i < fox_rows; ++i) {
      var rowText = g_fox[i]

      for (var j = 0; j < rowText.length; ++j) {
        g_canvasContainer2D.fillText(rowText[j],
          fox_columnStart + j * fox_fontSize,
          fox_rowStart + i * fox_fontSize)
      }
    }

  }


});