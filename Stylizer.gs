function onOpen() {
  DocumentApp.getUi().createAddonMenu().addItem('Stylize All Paragraphs', "setColors").addToUi()
}

function setColors()
{
  phrase_color = "#56c765";
  equal_color = "#9d5ffa";
  meanings_color = "#FFFFFF";
  pipes_color = "#9d5ffa";
  dash_color = "#9d5ffa";
  examples_color = "#8082ff";

  stylizeParagraphs(phrase_color, equal_color, meanings_color, pipes_color, dash_color, examples_color);
}

function stylizeParagraphs(phrase_color, equal_color, meanings_color, pipes_color, dash_color, examples_color) {

  var active_document = DocumentApp.getActiveDocument();
  var paragraphs = active_document.getBody().getParagraphs(); // get all paragrapsh

  
  for (var paragraph of paragraphs) // read every paragraphs
  {
    if (paragraph.getText().match(/^\s*$/) !== null) // if paragraph is empty (or just spaces)
      continue;

    var paragraph_string = paragraph.getText().toString();
    
    var splited_string = paragraph_string.split(/[=|-]/); // extract element of string (string without '=' '|' '-' marks) 

    var meanings_number = paragraph_string.replace(/[^|]/g, "").length + 1;
    var examples_number = paragraph_string.replace(/[^-]/g, "").length;

    // create phrase paragraph
    var phrase = splited_string[0]; // phrase is always first element
    var phrase_paragraph = active_document.getBody().appendParagraph(phrase);
    phrase_paragraph.setAttributes({BOLD : true, FOREGROUND_COLOR : phrase_color, ITALIC : false});

    if (splited_string.length == 1) // if paragraph only has a phrase (not meanings and examples)
    {
      var space_paragraph = active_document.getBody().appendParagraph(" "); // adding space paragraph for not changing bullet points color
      space_paragraph.setAttributes({BOLD : false, FOREGROUND_COLOR : meanings_color, ITALIC : false})
      space_paragraph.merge();  
      continue;
    }
      
    // create an '=' mark as paragraph
    var equal = active_document.getBody().appendParagraph("= ");
    equal.setAttributes({BOLD : false, FOREGROUND_COLOR : equal_color, ITALIC : false})
    equal.merge();  

    if (meanings_number != 0) // if meaning number is zero, doesn't need to read loop
      for (var i = 1; i < meanings_number + 1; i++) // for meanings
      {
        // create meanings paragraph
          var meaning = splited_string[i];
          meaning_paragraph = active_document.getBody().appendParagraph(meaning);
          meaning_paragraph.setAttributes({BOLD : true, FOREGROUND_COLOR : meanings_color, ITALIC : false});
          meaning_paragraph.merge();

        // create pipe paragraph 
          if (i == meanings_number) // don't create last vertical line
            break;
          var pipe_paragraph = active_document.getBody().appendParagraph("|");
          pipe_paragraph.setAttributes({BOLD : true, FOREGROUND_COLOR : pipes_color, ITALIC : false});
          pipe_paragraph.merge();
      }

    if (examples_number != 0) // if example number is zero, doesn't need to read loop
      for (var i = meanings_number + 1; i < splited_string.length; i++) // for examples
      {
        // create dash paragraph
          var dash_paragraph = active_document.getBody().appendParagraph("-");
          dash_paragraph.setAttributes({BOLD : true, FOREGROUND_COLOR : dash_color, ITALIC : false});
          dash_paragraph.merge();

        // create example paragraph
          var example = splited_string[i];
          example_paragraph = active_document.getBody().appendParagraph(example);
          example_paragraph.setAttributes({BOLD : false, FOREGROUND_COLOR : examples_color, ITALIC : true});
          example_paragraph.merge();
      } 
  }
}
