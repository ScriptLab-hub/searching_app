// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    // Get all the elements we need
    const authorSelect = document.getElementById('authorSelect');
    const categorySelect = document.getElementById('categorySelect');
    const searchBtn = document.getElementById('searchBtn');
    const resultsDiv = document.getElementById('results');
    const bookList = document.getElementById('bookList');
    const loadingDiv = document.getElementById('loading');
    const noResultsDiv = document.getElementById('noResults');

    // Sample data - in a real app, this would come from a database
    const authors = [
        { id: 1, name: "J.K. Rowling" },
        { id: 2, name: "George Orwell" },
        { id: 3, name: "Jane Austen" }
    ];

    const categories = [
        { id: 1, name: "Fantasy", authorId: 1 },
        { id: 2, name: "Dystopian", authorId: 2 },
        { id: 3, name: "Classic", authorId: 3 },
        { id: 4, name: "Fiction", authorId: 1 }
    ];

    const books = [
        { id: 1, title: "Harry Potter", authorId: 1, categoryId: 1, year: 1997, cover: "https://images.example.com/hp.jpg" },
        { id: 2, title: "1984", authorId: 2, categoryId: 2, year: 1949, cover: "https://images.example.com/1984.jpg" },
        { id: 3, title: "Pride and Prejudice", authorId: 3, categoryId: 3, year: 1813, cover: "https://images.example.com/p&p.jpg" }
    ];

    // Populate authors dropdown
    authors.forEach(author => {
        const option = document.createElement('option');
        option.value = author.id;
        option.textContent = author.name;
        authorSelect.appendChild(option);
    });

    // When author changes, update categories
    authorSelect.addEventListener('change', function() {
        const selectedAuthorId = parseInt(this.value);
        
        // Reset category dropdown
        categorySelect.innerHTML = '<option value="">-- Select a category --</option>';
        categorySelect.disabled = !selectedAuthorId;
        searchBtn.disabled = true;
        
        if (selectedAuthorId) {
            // Filter categories for this author
            const authorCategories = categories.filter(cat => cat.authorId === selectedAuthorId);
            
            if (authorCategories.length > 0) {
                authorCategories.forEach(cat => {
                    const option = document.createElement('option');
                    option.value = cat.id;
                    option.textContent = cat.name;
                    categorySelect.appendChild(option);
                });
            } else {
                categorySelect.innerHTML = '<option value="">-- No categories available --</option>';
            }
        }
    });

    // When category changes, enable search button
    categorySelect.addEventListener('change', function() {
        searchBtn.disabled = !this.value;
    });

    // Handle search button click
    searchBtn.addEventListener('click', function() {
        const authorId = parseInt(authorSelect.value);
        const categoryId = parseInt(categorySelect.value);
        
        if (!authorId || !categoryId) return;
        
        // Show loading spinner
        loadingDiv.classList.remove('hidden');
        resultsDiv.classList.add('hidden');
        noResultsDiv.classList.add('hidden');
        
        // Simulate API call with setTimeout
        setTimeout(() => {
            // Filter books
            const filteredBooks = books.filter(book => 
                book.authorId === authorId && book.categoryId === categoryId
            );
            
            // Hide loading spinner
            loadingDiv.classList.add('hidden');
            
            if (filteredBooks.length > 0) {
                // Display books
                bookList.innerHTML = '';
                filteredBooks.forEach(book => {
                    const bookCard = createBookCard(book);
                    bookList.appendChild(bookCard);
                });
                resultsDiv.classList.remove('hidden');
            } else {
                // Show no results message
                noResultsDiv.classList.remove('hidden');
            }
        }, 800); // Simulate network delay
    });

    // Helper function to create a book card
    function createBookCard(book) {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded-lg shadow hover:shadow-lg transition fade-in';
        
        const authorName = authors.find(a => a.id === book.authorId)?.name || 'Unknown';
        
        card.innerHTML = `
            <div class="h-40 bg-gray-200 mb-3 flex items-center justify-center">
                ${book.cover ? 
                    `<img src="${book.cover}" alt="${book.title}" class="h-full object-cover">` : 
                    `<i class="fas fa-book-open text-gray-400 text-4xl"></i>`}
            </div>
            <h3 class="font-bold text-lg mb-1">${book.title}</h3>
            <p class="text-gray-600 text-sm mb-2">By ${authorName}</p>
            <p class="text-gray-500 text-sm">${book.year || 'Year not available'}</p>
        `;
        
        return card;
    }
});