<script lang="ts">
	import type { PageData } from "./$types";

    export let data: PageData    
</script>

<main>
    <div>
        <form action="/" method="POST">
            <label>
                todo
                <input name="todo" type="text">
            </label>

            <button>add</button>          
            
            {#each data.data as item}
                <li>{item.todo} - {item.createdDate}</li>
            {/each}
        </form>
    </div>
</main>