export function ArticleImage({
  src,
  alt
}: React.ComponentProps<"img">) {
  return (
    <span className="block text-center">
      <img className="mt-6 mb-2 ml-auto mr-auto max-w-xl" src={src} alt={alt}/>
      <span className="text-sm text-secondary-foreground">{alt}</span>
    </span>
  );
}
