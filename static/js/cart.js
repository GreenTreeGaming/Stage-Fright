var updateButtons = document.getElementsByClassName('update-cart');

for (var i = 0; i < updateButtons.length; i++) {
  updateButtons[i].addEventListener('click', function() {
    var productId = this.dataset.product
    var action = this.dataset.action
    console.log('productId:', productId, 'action:', action)

    console.log('USER:', user)
    if (user === 'AnonymousUser') {
      addCookieItem(productId, action)
    } else {
      updateUserOrder(productId, action)
    }
  })
}

function addCookieItem(productId, action) {
  if (action == 'add') {
    if (cart[productId] == undefined) {
      cart[productId] = {'quantity': 1}
    } else {
      cart[productId]['quantity'] += 1
    }
  }

  if (action == 'remove') {
    cart[productId]['quantity'] -= 1

    if (cart[productId]['quantity'] <= 0) {
      console.log('Removed item!')
      delete cart[productId]
    }
  }

  document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/";
  location.reload()
}

function updateUserOrder(productId, action) {
  console.log('User is logged in, sending data.')

  var url = '/update_item/'

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({'productId': productId, 'action': action}),
  })

  .then((response) => {
    return response.json()
  })

  .then((data) => {
    location.reload()
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");

  // Hide loader when the page has fully loaded, with a minimum 1-second delay
  window.onload = () => {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 1000); // 1-second delay
  };

  // Show loader only when navigating to a different page (not anchors or same-page links)
  const links = document.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", (event) => {
      const targetHref = link.href;
      const currentHref = window.location.href;

      // Ignore links pointing to the same page or anchors (e.g., #section)
      if (
        targetHref.startsWith(window.location.origin) && // Same origin
        !targetHref.includes('#') && // Not an anchor link
        targetHref !== currentHref // Not the same page
      ) {
        loader.classList.remove("hidden");
      }
    });
  });
});