import re

file_path = r'c:\Users\camo1\Documents\flagship-agency\src\multiverse\pigmentostkts-web\src\components\PriceCalculator.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix common broken patterns caused by the tool
# Note: Be careful not to fix subtraction or division in code if it should have spaces.
# But in Tailwind classes and object paths, spaces are definitely wrong.

# Fix Tailwind classes like bg - white -> bg-white
content = re.sub(r'bg\s+-\s+', 'bg-', content)
content = re.sub(r'text\s+-\s+', 'text-', content)
content = re.sub(r'hover\s+:\s+', 'hover:', content)
content = re.sub(r'p\s+-\s+', 'p-', content)
content = re.sub(r'py\s+-\s+', 'py-', content)
content = re.sub(r'px\s+-\s+', 'px-', content)
content = re.sub(r'rounded\s+-\s+', 'rounded-', content)
content = re.sub(r'border\s+-\s+', 'border-', content)
content = re.sub(r'shadow\s+-\s+', 'shadow-', content)
content = re.sub(r'items\s+-\s+center', 'items-center', content)
content = re.sub(r'justify\s+-\s+', 'justify-', content)
content = re.sub(r'gap\s+-\s+', 'gap-', content)
content = re.sub(r'transition\s+-\s+', 'transition-', content)
content = re.sub(r'duration\s+-\s+', 'duration-', content)
content = re.sub(r'scale\s+-\s+', 'scale-', content)
content = re.sub(r'inset\s+-\s+', 'inset-', content)
content = re.sub(r'leading\s+-\s+', 'leading-', content)
content = re.sub(r'line\s+-\s+clamp', 'line-clamp', content)
content = re.sub(r'h\s+-\s+', 'h-', content)
content = re.sub(r'w\s+-\s+', 'w-', content)
content = re.sub(r'ring\s+-\s+', 'ring-', content)
content = re.sub(r'via\s+-\s+', 'via-', content)
content = re.sub(r'to\s+-\s+', 'to-', content)
content = re.sub(r'from\s+-\s+', 'from-', content)
content = re.sub(r'pointer\s+-\s+events', 'pointer-events', content)
content = re.sub(r'backdrop\s+-\s+blur', 'backdrop-blur', content)

# Fix object paths like PIGMENTO_DATA . contact -> PIGMENTO_DATA.contact
content = re.sub(r'\s+\.\s+', '.', content)

# Fix template literals like ${ ... } -> ${...}
content = re.sub(r'\${\s+', '${', content)
content = re.sub(r'\s+}', '}', content)

# Fix function calls and logic spaces
content = re.sub(r'encodeURIComponent\s*\(\s*', 'encodeURIComponent(', content)
content = re.sub(r'\s*\)\s*', ')', content) # risky

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
