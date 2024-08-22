export const LocalStorageService = {
  setRecentDestination: function (Destination: any) {
    localStorage.setItem("RecentDestination", Destination);
  },

  getRecentDestination: function () {
    return localStorage.getItem("RecentDestination");
  },

  deleteSession: function () {
    localStorage.removeItem("RecentDestination")
  },
};