export function getCards() {
  return fetch('/card').then(res => res.json())
}

export function destroyCard(id) {
  return fetch(`/card/${id}`, { method: 'DELETE' })
}

export function saveCard(card) {
  return card.id ? updateCard(card) : createCard(card)
}

export function createCard(card) {
  return fetch('/card', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(card)
  }).then(res => res.json())
}

function updateCard(card) {
  return fetch(`/card/${card.id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(card)
  }).then(res => res.json())
}
