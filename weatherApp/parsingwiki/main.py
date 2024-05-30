import wikipedia

# Set language to English
wikipedia.set_lang('en')

# Get input and fetch Wikipedia page
cin = input("Enter the Wikipedia page title: ")
page = wikipedia.page(cin)

# Extract necessary data
title = page.title
summary = page.summary
images = page.images

# Generate HTML content
html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
</head>
<body>
    <h1>{title}</h1>
    <p>{summary}</p>
    <h2>Images</h2>
    <div>
        {"".join([f'<img src="{img}" alt="Image" style="width:300px;"><br>' for img in images[:5]])}
    </div>
</body>
</html>
"""

# Write HTML content to a file
with open("wikipedia_page.html", "w", encoding="utf-8") as file:
    file.write(html_content)

print("HTML file created successfully!")
