var toolbarOptions= [
    ['bold', 'italic', 'underline', 'strike','blockquote', 'code-block'],
    [{'header' :[1 ,2 ,3 ,4 ,5 ,6 ,false] }],
    [{'list' :'ordered'}, {'list' :'bullet'}],
    [{'script' :'sub'}, {'script' :'super'}],
    [{'indent' :'-1'}, {'indent' :'+1'}],
    [{'direction' :'rtl'}],
    [{'size' : ['small', false, 'large', 'huge'] }],
    ['link', 'image' ,'video', 'formula'],
    [{'color' :[] }, {'background' :[] }],
    [{'font' : [] }],
    [{'align' : []} ]
    ];
var quill =new Quill('#editor',{
    modules: {
    toolbar: toolbarOptions
    },
    theme: 'snow'
});

var form = document.getElementById("form"); // get form by ID
var contents = document.querySelector('input[name=body]'); // set name input var
contents.value = JSON.stringify(quill.getContents()); // populate name input with quill data

form.onsubmit = function() { // onsubmit do this first
    var name = document.querySelector('input[name=body]'); // set name input var
    name.value = JSON.stringify(quill.getContents()); // populate name input with quill data
    return true; // submit form
  }
                           
