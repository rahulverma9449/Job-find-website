function deleteProduct(id) {
    console.log("delete function got hit")
    const result = confirm(
      'Are you sure you want to delete this product ?'
    );
    if (result) {
      fetch('/delete/' + id, {
        method: 'POST',
      }).then((res) => {
        if (res.ok) {
          location.reload();
        }
      });
    }
  }