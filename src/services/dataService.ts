export const dataService = {
  items: [
    { id: 1, destination: 'Paris', country: 'France', description: 'The city of lights and the iconic Eiffel Tower.', color: '#FF5F6D', tags: ['Romantic', 'Art'] },
    { id: 2, destination: 'Tokyo', country: 'Japan', description: 'Neon lights, sushi, and a mix of culture and tech.', color: '#2193b0', tags: ['Culture', 'Food'] },
    { id: 3, destination: 'Grand Canyon', country: 'USA', description: 'Massive red rock formations and natural beauty.', color: '#ee9ca7', tags: ['Nature', 'Hiking'] },
    { id: 4, destination: 'Santorini', country: 'Greece', description: 'Beautiful blue domes and stunning sunset views.', color: '#00b09b', tags: ['Beach', 'Luxury'] },
    { id: 5, destination: 'Swiss Alps', country: 'Switzerland', description: 'Snowy peaks and world-class skiing resorts.', color: '#6a11cb', tags: ['Snow', 'Adventure'] }
  ],
  listItems() { return this.items; },
  getItem(id: number) { return this.items.find(i => i.id === id); },
  deleteItem(id: number) { this.items = this.items.filter(i => i.id !== id); },
  updateItem(id: number, data: any) {
    const index = this.items.findIndex(i => i.id === id);
    if (index !== -1) this.items[index] = { ...this.items[index], ...data };
  }
};