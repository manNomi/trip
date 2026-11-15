const previousSections = {
  "#itinerary": "./itinerary.html",
  "#flights": "./flights.html",
  "#stay": "./hotels.html",
  "#hotel": "./hotels.html",
  "#charner-photos": "./hotels.html#charner-photos",
  "#places": "./places.html",
  "#transport": "./itinerary.html#transport",
  "#packing": "./itinerary.html#packing",
};

const currentPage = new URL(location.href);
const isLegacyGuide = currentPage.pathname.endsWith("/guide.html");
const target = previousSections[currentPage.hash]
  ?? (currentPage.searchParams.has("hotel") ? "./hotels.html" : undefined)
  ?? (isLegacyGuide ? "./index.html" : undefined);

if (target) {
  const nextPage = new URL(target, currentPage);
  nextPage.search = currentPage.search;
  location.replace(nextPage);
}
