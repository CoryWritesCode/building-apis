function getChirps() {

  $.ajax({
    method: "GET",
    url: "http://localhost:3000/api/chirps/",
    dataType: "json",
    success: function (res) {
      $.each(res, (key, obj) => {
        if (obj.text) {
        $('.chirp-container').append(`<div class="chirp" id="${key}">${obj.text}</div>`);
        $(`#${key}`).append(`<button id="editor" type="button" onclick="editChirp(${key})">edit</button>`);
        $(`#${key}`).append(`<button id="deleter" type="button" onclick="deleteChirp(${key})">x</button>`);
        }

      });

    }

  });

}

function deleteChirp(key) {

  $.ajax({

    method: "DELETE",
    url: `http://localhost:3000/api/chirps/${key}`

  });

  location.reload();

}

function saveNewChirp(value, text) {

  $.ajax({

    method: "PUT",
    url: `http://localhost:3000/api/chirps/${value}`,
    data: JSON.stringify(text),
    contentType: "application/json; charset=utf-8",

  });

}

$('#submit').click(function (e) {
  let value = $('#new-chirp').val();
  let text = { text: value }

  $.ajax({
    method: "POST",
    url: "http://localhost:3000/api/chirps/",
    data: JSON.stringify(text),
    contentType: "application/json; charset=utf-8"
  })

  $('#new-chirp').val("");

  location.reload();

});

function editChirp(key) {
  $('#exampleModal').modal('show');

  $('button#save').click(function (e) {

    let value = $('#edit-chirp').val();
    let text = { text: value }
    saveNewChirp(key, text);

    location.reload();
  });
};

getChirps();
