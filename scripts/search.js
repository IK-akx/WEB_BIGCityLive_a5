$(document).ready(function() {
    console.log("jQuery is ready!");
    
    // Sample event data for suggestions
    const eventSuggestions = [
        "Bogdan Titomir", "Retro Night", "Kairat vs Real Madrid", 
        "Dimash Kudaibergen", "Charity Marathon", "Fashion Store",
        "Music Festival", "Tech Conference", "Art Exhibition", 
        "Food Fair", "Sports Tournament", "Business Workshop",
        "Music Concert", "Tech Meetup", "Art Show", "Food Market",
        "Football", "Concert", "Marathon", "Fashion", "Shopping"
    ];

    // ===== TASK 1 & 2: Real-time Search Filter with Autocomplete =====
    
    function performEventSearch() {
        const searchTerm = $('#eventSearch').val().toLowerCase();
        
        // Filter event items
        $('.event-card, .dynamic-event-card').each(function() {
            const eventText = $(this).text().toLowerCase();
            
            if (eventText.includes(searchTerm)) {
                $(this).show().css('opacity', '1');
            } else {
                $(this).hide().css('opacity', '0');
            }
        });
        
        // Show message if no results
        const visibleEvents = $('.event-card:visible, .dynamic-event-card:visible').length;
        if (searchTerm && visibleEvents === 0) {
            showNoResultsMessage(searchTerm);
        } else {
            hideNoResultsMessage();
        }
    }
    
    // Autocomplete functionality
    $('#eventSearch').on('keyup', function() {
        const searchTerm = $(this).val().toLowerCase();
        const suggestions = $('#suggestions');
        
        // Clear previous suggestions
        suggestions.empty();
        
        // Show/hide suggestions
        if (searchTerm.length > 0) {
            const filteredSuggestions = eventSuggestions.filter(suggestion => 
                suggestion.toLowerCase().includes(searchTerm)
            );
            
            if (filteredSuggestions.length > 0) {
                filteredSuggestions.forEach(suggestion => {
                    suggestions.append(
                        `<div class="suggestion-item" style="padding: 10px 14px; cursor: pointer; border-bottom: 1px solid #eee; color: #333; transition: all 0.2s ease; font-size: 14px;">${suggestion}</div>`
                    );
                });
                suggestions.show();
            } else {
                suggestions.hide();
            }
        } else {
            suggestions.hide();
        }
        
        // Perform search as user types (real-time filtering)
        performEventSearch();
    });

    // Click on suggestion
    $(document).on('click', '.suggestion-item', function() {
        const selectedText = $(this).text();
        $('#eventSearch').val(selectedText);
        $('#suggestions').hide();
        performEventSearch();
    });

    // Hide suggestions when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.event-search-container').length) {
            $('#suggestions').hide();
        }
    });

    // Suggestion hover effects
    $(document).on('mouseenter', '.suggestion-item', function() {
        $(this).css('background', '#f8f9fa');
        $(this).css('color', '#007bff');
    }).on('mouseleave', '.suggestion-item', function() {
        $(this).css('background', '');
        $(this).css('color', '#333');
    });

    // No results message functions
    function showNoResultsMessage(searchTerm) {
        let noResultsMsg = $('#no-results-message');
        if (noResultsMsg.length === 0) {
            $('.events-grid').after(
                `<div id="no-results-message" style="text-align: center; padding: 40px; color: #666; font-size: 18px;">
                    <p>No events found for "<strong>${searchTerm}</strong>"</p>
                    <button id="clear-search" style="padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Show All Events</button>
                </div>`
            );
            
            $('#clear-search').on('click', function() {
                $('#eventSearch').val('');
                performEventSearch();
                hideNoResultsMessage();
            });
        } else {
            noResultsMsg.find('strong').text(searchTerm);
        }
    }
    
    function hideNoResultsMessage() {
        $('#no-results-message').remove();
    }

    // ===== TASK 3: Global Search Highlighting =====
    
    function searchAcrossPages(searchTerm) {
        if (searchTerm.trim() === '') {
            alert('Please enter a search term');
            return;
        }
        
        // First check if the word exists on current page
        const foundOnCurrentPage = highlightText(searchTerm);
        
        // Define pages to search
        const pagesToSearch = [
            { name: 'Home', url: '../index.html', keywords: ['Astana', 'Kazakhstan', 'VISIT ASTANA', 'Almaty', 'Aktobe', 'FAQ', 'About', 'Events', 'Places', 'City', 'Live'] },
            { name: 'Events', url: 'events.html', keywords: ['Bogdan Titomir', 'Dimash', 'Charity', 'Football', 'Fashion', 'Marathon', 'Concert', 'Sports', 'Shopping', 'Music', 'Art'] },
            { name: 'About', url: 'about.html', keywords: ['About Us', 'BIG CITY LIVE', 'mission', 'culture', 'events', 'urban life', 'city', 'experience', 'platform', 'guide'] },
            { name: 'Places', url: 'cities.html', keywords: ['Almaty', 'Aktobe', 'cities', 'Astana', 'culture', 'Kazakhstan', 'modern', 'architecture', 'mountain', 'industrial'] }
        ];
        
        let foundOtherPages = [];
        const currentPage = window.location.pathname;
        
        // Check which OTHER pages might contain the search term
        pagesToSearch.forEach(page => {
            const isCurrentPage = currentPage.includes(page.url) || 
                                 (currentPage.includes('events.html') && page.name === 'Events') ||
                                 (currentPage.includes('index.html') && page.name === 'Home') ||
                                 (currentPage.includes('about.html') && page.name === 'About') ||
                                 (currentPage.includes('cities.html') && page.name === 'Places');
            
            if (!isCurrentPage) {
                if (page.keywords.some(keyword => 
                    keyword.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    searchTerm.toLowerCase().includes(keyword.toLowerCase())
                )) {
                    foundOtherPages.push(page);
                }
            }
        });
        
        // If word exists on current page
        if (foundOnCurrentPage) {
            // If also found on other pages, show info message
            if (foundOtherPages.length > 0) {
                let message = 'Search term "' + searchTerm + '" also found in:\n\n';
                foundOtherPages.forEach(page => {
                    message += '• ' + page.name + '\n';
                });
                message += '\nVisit these pages to search there.';
                
                setTimeout(() => {
                    alert(message);
                }, 800);
            }
        } 
        // If word doesn't exist on current page but exists on other pages
        else if (foundOtherPages.length > 0) {
            let message = 'Search term "' + searchTerm + '" not found on this page, but exists in:\n\n';
            foundOtherPages.forEach(page => {
                message += '• ' + page.name + '\n';
            });
            message += '\nWould you like to navigate to one of these pages?';
            
            if (confirm(message)) {
                let pageOptions = foundOtherPages.map((page, index) => 
                    `${index + 1}. ${page.name}`
                ).join('\n');
                
                const choice = prompt(`Which page would you like to visit?\n\n${pageOptions}`);
                const pageIndex = parseInt(choice) - 1;
                
                if (pageIndex >= 0 && pageIndex < foundOtherPages.length) {
                    window.location.href = foundOtherPages[pageIndex].url;
                }
            }
        }
        // If word doesn't exist anywhere
        else {
            alert('No matches found for: "' + searchTerm + '" in visible text on any page');
        }
    }

    function highlightText(searchTerm) {
        removeHighlights();
        
        if (searchTerm.trim() === '') return false;
        
        let firstHighlight = null;
        
        // Elements to exclude from search
        const excludedSelectors = 'script, style, noscript, meta, link, head, title, code, pre, [style*="display:none"], [style*="display: none"], .search-highlight, .search-container, input, textarea, select, button, .navbar-brand';
        
        // Search only in visible text content
        $(`body *:not(${excludedSelectors})`).contents().each(function() {
            if (this.nodeType === 3) {
                const $parent = $(this).parent();
                
                if ($parent.is(':visible') && !$parent.is(excludedSelectors)) {
                    const text = $(this).text().trim();
                    
                    if (text.length > 2 && 
                        !text.match(/^[{}()<>;=]+$/) &&
                        !text.match(/^[0-9\.]+$/) &&
                        !text.match(/^[a-z]+\.[a-z]+$/) &&
                        !$(this).parent().is('script, style, code, pre') &&
                        text.toLowerCase().includes(searchTerm.toLowerCase())) {
                        
                        const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
                        const highlightedText = text.replace(regex, '<span class="search-highlight" style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 2px; color: #000;">$1</span>');
                        
                        $(this).replaceWith(highlightedText);
                        
                        if (!firstHighlight) {
                            firstHighlight = $('.search-highlight').first();
                        }
                    }
                }
            }
        });
        
        // Scroll to first highlight if found
        if (firstHighlight && firstHighlight.length > 0) {
            $('html, body').animate({
                scrollTop: firstHighlight.offset().top - 100
            }, 500);
            return true;
        } else {
            return false;
        }
    }

    function removeHighlights() {
        $('.search-highlight').each(function() {
            $(this).replaceWith($(this).text());
        });
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Global search handlers
    $('#highlightBtn').on('click', function() {
        const searchTerm = $('#globalSearch').val();
        if (searchTerm.trim()) {
            searchAcrossPages(searchTerm);
        }
    });

    $('#globalSearch').on('keypress', function(e) {
        if (e.which === 13) {
            $('#highlightBtn').click();
        }
    });

    $('#globalSearch').on('input', function() {
        if ($(this).val().trim() === '') {
            removeHighlights();
        }
    });

    // Night theme adjustments
    function adjustSearchForNightTheme() {
        if ($('body').hasClass('night-theme')) {
            $('#globalSearch, #eventSearch').css({
                'background': 'rgba(255, 255, 255, 0.1)',
                'color': 'white',
                'border-color': '#555'
            });
            $('#suggestions').css({
                'background': '#2c3e50',
                'border-color': '#555',
                'color': 'white'
            });
            $('.suggestion-item').css({
                'color': 'white',
                'border-bottom-color': '#555'
            });
        } else {
            $('#globalSearch, #eventSearch').css({
                'background': 'rgba(255, 255, 255, 0.9)',
                'color': '#333',
                'border-color': '#ddd'
            });
            $('#suggestions').css({
                'background': 'white',
                'border-color': '#ddd',
                'color': '#333'
            });
            $('.suggestion-item').css({
                'color': '#333',
                'border-bottom-color': '#eee'
            });
        }
    }

    // Watch for theme changes
    $(document).on('click', '#themeToggleBtn', function() {
        setTimeout(adjustSearchForNightTheme, 100);
    });

    // Button hover effects
    $('#highlightBtn').hover(
        function() {
            $(this).css('background', '#0056b3');
            $(this).css('transform', 'translateY(-1px)');
        },
        function() {
            const isNightTheme = $('body').hasClass('night-theme');
            $(this).css('background', isNightTheme ? '#0056b3' : '#007bff');
            $(this).css('transform', 'translateY(0)');
        }
    );

    // Initial adjustment
    adjustSearchForNightTheme();
});