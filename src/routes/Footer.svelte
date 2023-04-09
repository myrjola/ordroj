<script>
    import {ExternalLink} from 'lucide-svelte'

</script>

<footer class="bg-gray-900" aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="p-4 flex justify-between items-baseline">
        <div class="text-xs leading-5 text-gray-400">&copy; 2023 Martin Yrjölä</div>
        <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/myrjola/ordroj"
                class="group rounded whitespace-nowrap text-gray-400 hover:text-white p-4 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white"
        >
            Forka mig på Github
            <span class="flex items-center">
          <ExternalLink
              aria-label="Extern länk"
              className="h-5 w-5 text-gray-400 group-hover:text-white"
          />
        </span>
        </a>
    </div>
</footer>
