export interface TimelineStep {
  title: string
  subtitle: string
  description: string
  learnMoreText?: string
}

export interface TimelineData {
  steps: TimelineStep[]
  urls: (string | null)[]
  iconUrls: (string | null)[]
}

export interface TimelinePointState {
  id: number
  isActive: boolean
  progress: number
}
