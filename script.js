function copyText(button) {
  var textBoxContainer = button.parentNode;
  var sourceText = textBoxContainer.querySelector('input[type="text"]');
  sourceText.select();
  document.execCommand("copy");
  sourceText.setSelectionRange(0, 0);
  alert("Text Copied: " + sourceText.value);

  // Highlight the copied text for 30 seconds
  sourceText.classList.add('highlight');
  setTimeout(function() {
    sourceText.classList.remove('highlight');
  }, 30000);
}

function addTextBox() {
  var container = document.querySelector('.container');
  var textboxContainer = document.createElement('div');
  textboxContainer.classList.add('textbox-container');

  var input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Type or paste text here');

  var button = document.createElement('button');
  button.textContent = 'Copy to Clipboard';
  button.setAttribute('onclick', 'copyText(this)');

  textboxContainer.appendChild(input);
  textboxContainer.appendChild(button);

  container.insertBefore(textboxContainer, container.lastElementChild);
}

function exportData() {
  var textToExport = "";
  var inputs = document.querySelectorAll('input[type="text"]');
  inputs.forEach(function(input) {
    textToExport += input.value + "\n";
  });
  var blob = new Blob([textToExport], { type: 'text/plain' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'text_data.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function importData(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var text = e.target.result;
    var lines = text.split('\n');
    var inputs = document.querySelectorAll('input[type="text"]');
    lines.forEach(function(line, index) {
      if (inputs[index]) {
        inputs[index].value = line;
      } else {
        addTextBox();
        inputs = document.querySelectorAll('input[type="text"]');
        inputs[index].value = line;
      }
    });
  };
  reader.readAsText(file);
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
