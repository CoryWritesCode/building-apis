function getChirps() {

  $.ajax({
    method: "GET",
    url: "http://localhost:3000/api/chirps/",
    dataType: "json",
    success: function (res) {
      $.each(res, (key, obj) => {
        if (obj.text) {
        $('.chirp-container').append(`<div class="chirp" id="${key}">${obj.text}</div>`);
        $(`#${key}`).append(`<button class="${key}" id="editor" type="button" data-toggle="modal" data-target="#exampleModal" data-whatever="${key}">edit</button>`);
        $(`#${key}`).append(`<button id="deleter" type="button" onclick="deleteChirp(${key})">x</button>`);
        }

        $('#exampleModal').on('show.bs.modal', (e) => {
          let button = $(e.relatedTarget);
          let value = button.data('whatever');
          let newChirp = $('#edit-chirp').val();
          let text = { text: newChirp };

          console.log(button);
          console.log(newChirp);
          console.log(value);

          $('button#save').click(function (e) {
            e.preventDefault();

            editChirp(value, text);

            location.reload();
          });

        });

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

function editChirp(value, text) {

  $.ajax({

    method: "PUT",
    url: `http://localhost:3000/api/chirps/${value}`,
    data: JSON.stringify(text),
    dataType: "application/json; charset=utf-8",

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

$('#editor').click(function (e) {
  e.preventDefault();
  console.log(e.target);

});

getChirps();
