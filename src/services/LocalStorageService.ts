export const LocalStorageService = {
  setRecentDestination: function (Destination: any) {
    // Recupera a lista atual do localStorage
    const recentDestinations = this.getRecentDestinations();

    // Remove a duplicata, se existir, para evitar itens repetidos
    const filteredDestinations = recentDestinations.filter(
      (item: any) => item !== Destination
    );

    // Adiciona o novo destino ao início da lista
    filteredDestinations.unshift(Destination);

    // Limita a lista a no máximo 4 itens
    const limitedDestinations = filteredDestinations.slice(0, 4);

    // Armazena a lista atualizada no localStorage
    localStorage.setItem(
      "RecentDestinations",
      JSON.stringify(limitedDestinations)
    );
  },

  getRecentDestinations: function () {
    // Recupera a lista de destinos
    const serializedDestinations = localStorage.getItem("RecentDestinations");
    if (serializedDestinations) {
      return JSON.parse(serializedDestinations);
    }
    return []; // Retorna uma lista vazia se não houver nada no localStorage
  },

  deleteLastOneDestination: function () {
    // Recupera a lista atual do localStorage
    const recentDestinations = this.getRecentDestinations();

    // Remove o primeiro item da lista
    recentDestinations.pop();

    // Armazena a lista atualizada no localStorage
    localStorage.setItem(
      "RecentDestinations",
      JSON.stringify(recentDestinations)
    );
  }
};