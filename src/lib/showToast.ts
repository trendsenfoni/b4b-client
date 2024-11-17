import { useToast } from '@/components/ui/use-toast'

export function showError(err: any) {
  const { toast } = useToast()
  toast({ title: 'Error', description: err || '', variant: 'destructive' })
}

export function showInfo(title?: string, description?: string, duration?: number) {
  const { toast } = useToast()
  toast({ title: title, description: description, duration: duration || 700 })
}