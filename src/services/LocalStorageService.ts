export const LocalStorageService = {
  setRecentDestination: function (Destination: any) {
    const recentDestinations = this.getRecentDestinations();

    // Remove a duplicata, se existir
    const filteredDestinations = recentDestinations.filter((item: any) => item !== Destination);

    // Adiciona o novo destino ao início da lista
    filteredDestinations.unshift(Destination);

    // Limita a lista a no máximo 4 itens
    const limitedDestinations = filteredDestinations.slice(0, 4);

    // Armazena a lista atualizada no localStorage
    localStorage.setItem("RecentDestinations", JSON.stringify(limitedDestinations));
  },

  getRecentDestinations: function () {
    const serializedDestinations = localStorage.getItem("RecentDestinations");
    if (serializedDestinations) {
      return JSON.parse(serializedDestinations);
    }
    return [];
  },

  deleteFirstDestination: function () {
    const recentDestinations = this.getRecentDestinations();
    recentDestinations.shift();
    localStorage.setItem("RecentDestinations", JSON.stringify(recentDestinations));
  },
};
