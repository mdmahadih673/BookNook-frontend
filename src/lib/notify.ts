import { toast } from "@/components/ui/toast";

export function notify(message: string, type: "success" | "error" | "info" = "info") {
  toast.add({ title: message, type });
}
