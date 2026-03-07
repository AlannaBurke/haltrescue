# Custom MDX Components

This directory contains custom React components that can be used directly in any `.md` or `.mdx` blog post or documentation page. They are globally available — no import statements are needed.

---

## `<SupportUs />`

Inserts the beautifully styled "Support Our Rescue Work" call-to-action box. This component takes no props and should be placed at the end of any post that needs a donation section.

### Usage

```markdown
This is the end of my blog post.

<SupportUs />
```

---

## `<Caption />`

Wraps an image (or any other content) in a `<figure>` with a styled caption below it. This is the best way to add descriptive captions to your images.

### Usage

```markdown
<Caption text="This is a photo of Boba the guinea pig enjoying some delicious hay.">
  ![Boba the guinea pig](./boba.jpg)
</Caption>
```

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `text` | `string` | Yes | The caption text to display below the image. |
| `children` | `ReactNode` | Yes | The image or other content to be captioned. |

---

## `<SensitiveImage />`

Displays a blurred image with a warning overlay. The user must click the image to reveal it. This is ideal for post-operative photos, medical images, or any other content that might be upsetting to some viewers.

### Usage

```markdown
<SensitiveImage
  src="./boba-incision.jpeg"
  alt="A close-up of Boba the guinea pig's surgical incision after a tumor removal."
  caption="Boba's incision site, one day after surgery."
  warning="This photo shows a post-surgical incision."
/>
```

### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `src` | `string` | Yes | | Path to the image file. |
| `alt` | `string` | Yes | | **Crucial for accessibility.** A detailed description of the image content. |
| `caption` | `string` | No | | Optional caption text to display below the image. |
| `warning` | `string` | No | `This image contains sensitive content...` | Optional custom warning text to show in the overlay. |
