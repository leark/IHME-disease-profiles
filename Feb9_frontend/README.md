
# How to connect this PHP file to HTML
Within the action attribute of form/input, added search.php.
This might redirect the page to search.php (not sure)!

```
<form action='search.php'></form>
```

# Query
- SELECT * FROM DEATHS WHERE cause_name LIKE 'Meningitis'

	where Meningitis is the passed in parameter

# How to pass PHP variables to Javascript
[PHP to JS](https://stackoverflow.com/questions/23740548/how-to-pass-variables-and-data-from-php-to-javascript)

# How to run PHP using XAMPP
1. Download [XAMPP](https://www.apachefriends.org/index.html)
2. Go into Solution Explorer. This PC > OS(C:) or main drive > xampp > htdocs. Place the your files/code in here
3. On XAMPP, turn on both Modules Apache and MySQL
4. Go to localhost:8080/filename.extension
