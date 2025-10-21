# Contributing to TechVision 🤝

Thank you for your interest in contributing to TechVision! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the project
- Show empathy towards other contributors

## Getting Started

### 1. Fork & Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/visions-main.git
cd visions-main

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/visions-main.git
```

### 2. Set Up Development Environment

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure your .env file
# Initialize database
cd api/database && node init-db.js && cd ../..

# Start development
npm run dev
```

## Development Workflow

### 1. Create a Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### 2. Make Changes

Follow these guidelines:
- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run linting
npm run lint

# Build to check for errors
npm run build

# Test manually
npm run dev
```

### 4. Commit Changes

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add user profile feature"
```

#### Commit Message Convention

Use conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```bash
git commit -m "feat: add email validation to contact form"
git commit -m "fix: resolve database connection timeout"
git commit -m "docs: update API documentation"
```

### 5. Push Changes

```bash
# Push to your fork
git push origin feature/your-feature-name
```

### 6. Create Pull Request

1. Go to GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR template
5. Submit for review

## Project Structure

```
visions-main/
├── app/                    # Next.js pages
│   ├── admin/             # Admin pages
│   ├── services/          # Services pages
│   └── ...
├── components/            # React components
│   ├── admin/            # Admin components
│   ├── forms/            # Form components
│   └── ...
├── api/                   # Backend API
│   ├── src/              # Function handlers
│   ├── database/         # DB utilities
│   └── ...
├── lib/                   # Utility functions
└── data/                  # Static data
```

## Coding Standards

### TypeScript

```typescript
// Use proper typing
interface User {
    id: number;
    name: string;
    email: string;
}

// Avoid 'any' type
function getUser(id: number): User {
    // implementation
}

// Use async/await
async function fetchData(): Promise<Data> {
    const response = await fetch(url);
    return response.json();
}
```

### React Components

```typescript
// Use functional components
export default function ComponentName({ prop1, prop2 }: Props) {
    // Use hooks
    const [state, setState] = useState<string>('');
    
    // Clean up effects
    useEffect(() => {
        const cleanup = () => {};
        return cleanup;
    }, []);
    
    return <div>Component</div>;
}
```

### API Functions

```typescript
// Use Azure Functions v4 model
import { app, HttpRequest, HttpResponseInit } from '@azure/functions';

export async function functionName(
    request: HttpRequest
): Promise<HttpResponseInit> {
    try {
        // Validate input
        // Process request
        // Return response
        return {
            status: 200,
            jsonBody: { success: true }
        };
    } catch (error) {
        return {
            status: 500,
            jsonBody: { error: 'Internal server error' }
        };
    }
}

app.http('functionName', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: functionName
});
```

## Adding Features

### Adding a New Page

1. Create page in `app/your-page/page.tsx`
2. Add metadata in `app/your-page/metadata.ts`
3. Update navigation in `components/Navbar.tsx`
4. Test responsiveness
5. Add SEO metadata

### Adding a New API Function

1. Create function in `api/src/yourFunction.ts`
2. Add database queries if needed
3. Update CORS if necessary
4. Test thoroughly
5. Document the endpoint

### Adding a New Component

1. Create component in appropriate folder
2. Export properly
3. Add TypeScript interfaces
4. Document props
5. Test in isolation

## Testing Guidelines

### Manual Testing

Test these scenarios:
- Desktop browsers (Chrome, Firefox, Safari)
- Mobile devices (iOS, Android)
- Form submissions
- API endpoints
- Admin dashboard
- Error states
- Loading states

### Database Testing

```bash
# Test database connection
cd api
node test-db-connection.js

# Test queries
cd database
node test-queries.js
```

## Documentation

Update documentation when:
- Adding new features
- Changing APIs
- Modifying configuration
- Adding dependencies

Files to update:
- `README.md` - Main documentation
- `SETUP.md` - Setup instructions
- `DEPLOYMENT.md` - Deployment guide
- API documentation in function files

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows project style
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Commits are clean
- [ ] Branch is up to date with main

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2

## Testing
How to test these changes

## Screenshots (if applicable)
Add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

## Review Process

1. **Automated Checks**: CI/CD runs automatically
2. **Code Review**: Maintainer reviews code
3. **Testing**: Changes are tested
4. **Approval**: PR is approved or changes requested
5. **Merge**: PR is merged to main

## Common Issues

### Merge Conflicts

```bash
# Update your branch
git checkout main
git pull upstream main
git checkout your-branch
git rebase main

# Resolve conflicts
# Then continue
git rebase --continue
git push -f origin your-branch
```

### Build Errors

```bash
# Clean and rebuild
npm run clean:all
npm install
npm run build
```

## Areas Needing Contribution

- [ ] Unit tests
- [ ] E2E tests
- [ ] Accessibility improvements
- [ ] Performance optimization
- [ ] Documentation improvements
- [ ] Bug fixes
- [ ] New features

## Getting Help

- 📖 Read [README.md](README.md)
- 🔧 Check [SETUP.md](SETUP.md)
- 💬 Ask questions in Issues
- 📧 Email: admin@techvision.com

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to TechVision! 🎉
