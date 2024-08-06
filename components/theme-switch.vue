<template>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button @click="toggleTheme" variant="ghost" class="p-2 size-10">
        <template v-if="currentTheme === Theme.LIGHT">
          <Sun class="size-5" />
        </template>
        <template v-else>
          <Moon class="size-5" />
        </template>
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Toggle Theme</p>
    </TooltipContent>
  </Tooltip>
</template>

<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";
import { Theme, useTheme } from "~/composables/useTheme";

const { currentTheme, toggleTheme } = useTheme();
</script>