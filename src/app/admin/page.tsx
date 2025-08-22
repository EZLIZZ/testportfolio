"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Trash2, Edit, Plus, ImageIcon } from "lucide-react"

type Project = {
  id: string
  title: string
  subtitle?: string | null
  summary?: string | null
  imageUrl?: string | null
  updatedAt: string
}

export default function AdminPanel() {
  const [items, setItems] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [editing, setEditing] = useState<Project | null>(null)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    summary: "",
    imageUrl: "",
  })

  // ---- Helpers ----
  const resetForm = () => {
    setForm({ title: "", subtitle: "", summary: "", imageUrl: "" })
    setEditing(null)
    setOpen(false)
  }

  const loadProjects = async () => {
    setLoading(true)
    setError(null)
    try {
      const r = await fetch("/api/projects", { cache: "no-store" })
      if (!r.ok) throw new Error(`Failed to load (${r.status})`)
      const data: Project[] = await r.json()
      setItems(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setForm((f) => ({ ...f, imageUrl: (ev.target?.result as string) || "" }))
    }
    reader.readAsDataURL(file)
  }

  const handleCreate = async () => {
    if (!form.title.trim()) return
    try {
      const r = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          subtitle: form.subtitle.trim() || null,
          summary: form.summary.trim() || null,
          imageUrl: form.imageUrl || null,
        }),
      })
      if (!r.ok) {
        const j = await r.json().catch(() => ({}))
        throw new Error(j?.error || `Create failed (${r.status})`)
      }
      await loadProjects()
      resetForm()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Create failed")
    }
  }

  const handleUpdate = async () => {
    if (!editing) return
    try {
      const r = await fetch(`/api/projects/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          subtitle: form.subtitle.trim() || null,
          summary: form.summary.trim() || null,
          imageUrl: form.imageUrl || null,
        }),
      })
      if (!r.ok) {
        const j = await r.json().catch(() => ({}))
        throw new Error(j?.error || `Update failed (${r.status})`)
      }
      await loadProjects()
      resetForm()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Update failed")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const r = await fetch(`/api/projects/${id}`, { method: "DELETE" })
      if (!r.ok) throw new Error(`Delete failed (${r.status})`)
      // Optimistic refresh
      setItems((prev) => prev.filter((p) => p.id !== id))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Delete failed")
    }
  }

  const handleEdit = (p: Project) => {
    setEditing(p)
    setForm({
      title: p.title ?? "",
      subtitle: p.subtitle ?? "",
      summary: p.summary ?? "",
      imageUrl: p.imageUrl ?? "",
    })
    setOpen(true)
  }

  return (
    <div className="min-h-screen bg-background text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Project Admin Panel</h1>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditing(null)
                  setForm({ title: "", subtitle: "", summary: "", imageUrl: "" })
                }}
                className="bg-white text-black hover:bg-gray-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-background text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editing ? "Edit Project" : "Create New Project"}</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Enter project title"
                  />
                </div>

                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={form.subtitle}
                    onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Enter project subtitle"
                  />
                </div>

                <div>
                  <Label htmlFor="summary">Summary</Label>
                  <Textarea
                    id="summary"
                    value={form.summary}
                    onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Enter short project summary"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="image">Project Image</Label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="bg-gray-800 border-gray-600 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded file:px-3 file:py-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                        onClick={() => document.getElementById("image")?.click()}
                      >
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                    </div>

                    {form.imageUrl && (
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={form.imageUrl || "/placeholder.svg"}
                          alt="Project preview"
                          className="w-full h-32 object-cover rounded-md border border-gray-600"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => setForm((f) => ({ ...f, imageUrl: "" }))}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={editing ? handleUpdate : handleCreate}
                    className="bg-white text-black hover:bg-gray-200"
                    disabled={!form.title.trim()}
                  >
                    {editing ? "Update" : "Create"}
                  </Button>
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {error && (
          <div className="mb-6 text-sm text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-gray-400">Loading projects…</div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found</p>
            <p className="text-gray-500 mt-2">Click &quot;Add Project&quot; to create your first project</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <Card
                key={p.id}
                className="bg-background border-gray-700 overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300"
              >
                {p.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.imageUrl || "/placeholder.svg"}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-lg">{p.title}</CardTitle>
                      {p.subtitle && <p className="text-gray-400 italic mt-1">{p.subtitle}</p>}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(p)}
                        className="text-gray-400 hover:text-white hover:bg-gray-800"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(p.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-gray-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {p.summary && <p className="text-gray-300 mb-4">{p.summary}</p>}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">
                      Updated: {new Date(p.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
