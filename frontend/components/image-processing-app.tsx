'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Image as ImageIcon, FileText } from "lucide-react"

/**
 * ImageProcessingApp component for uploading, processing, and displaying images with generated descriptions and stories.
 * @returns {JSX.Element} A React component that renders the image processing application interface.
 */
export function ImageProcessingApp() {
  const [image, setImage] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [storyTitle, setStoryTitle] = useState('')
  const [story, setStory] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  /**
   * Handles the upload of an image file.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The event object from the file input change.
   * @returns {void} This function doesn't return a value, but sets the image state.
   */
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      /**
       * Handles the onload event of a FileReader, setting the image state with the loaded file content
       * @param {ProgressEvent<FileReader>} e - The event object containing the loaded file data
       * @returns {void} This function does not return a value
       */
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  /**
   * Processes an uploaded image by sending it to the server and updating the state with the received data.
   * @param {void} - This function doesn't take any parameters directly, but relies on the 'image' state.
   * @returns {Promise<void>} This function doesn't return a value, but updates several state variables.
   */
  const handleProcessImage = async () => {
    if (!image) return

    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/process-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to process image')
      }

      const data = await response.json()
      setDescription(data.description)
      setStoryTitle(data.storyTitle)
      setStory(data.story)
    } catch (error) {
      console.error('Error processing image:', error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Triggers a click event on the hidden file input element
   * @returns {void} This function doesn't return anything
   */
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">Image Processing App</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><ImageIcon className="mr-2" /> Image Upload and Processing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button 
                onClick={triggerFileInput} 
                variant="outline" 
                className="w-full sm:w-auto"
                aria-label="Upload image"
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                aria-hidden="true"
              />
              <Button 
                onClick={handleProcessImage} 
                className="w-full sm:w-auto" 
                disabled={!image || isLoading}
              >
                {isLoading ? 'Processing...' : 'Process Image'}
              </Button>
            </div>
            {image && (
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img src={image} alt="Uploaded preview" className="w-full h-full object-cover" />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><FileText className="mr-2" /> Image Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={description} readOnly className="h-[100px] resize-none" placeholder="Image description will appear here..." />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><FileText className="mr-2" /> {storyTitle || 'Image Story'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={story} readOnly className="h-[200px] resize-none" placeholder="Generated story will appear here..." />
          </CardContent>
        </Card>
      </div>
      {error && (
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive text-destructive rounded">
          Error: {error}
        </div>
      )}
    </div>
  )
}