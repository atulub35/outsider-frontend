import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  IconButton,
  Stack,
  Chip,
  CircularProgress,
  Paper,
  Divider,
  Tooltip,
  Button
} from '@mui/material'
import {
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Message as MessageIcon
} from '@mui/icons-material'
import { useApi } from '../hooks/useApi'
import { format } from 'date-fns'

const Chats = () => {
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)

  const api = useApi()

  // Fetch messages on mount
  useEffect(() => {
    fetchMessages()
  }, [])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchMessages = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true)
    }
    setError('')
    try {
      const response = await api.getChatMessages()
      const messagesData = response?.data || []
      setMessages(messagesData)
    } catch (err) {
      console.error('Failed to fetch messages:', err)
      setError('Failed to load chat history')
    } finally {
      if (showLoading) {
        setLoading(false)
      }
    }
  }

  const handleSendMessage = async (e) => {
    e?.preventDefault()
    
    if (!messageInput.trim() || sending) {
      return
    }

    const userMessage = messageInput.trim()
    setMessageInput('')
    setSending(true)
    setError('')

    // Optimistically add user message
    const tempUserMessage = {
      id: `temp-${Date.now()}`,
      role: 'user',
      content: userMessage,
      created_at: new Date().toISOString()
    }
    setMessages(prev => [...prev, tempUserMessage])

    try {
      const response = await api.sendChatMessage(userMessage)
      
      // Refetch messages to get the actual data from server with correct IDs and timestamps
      // Don't show loading state during refresh to avoid flickering
      await fetchMessages(false)
    } catch (err) {
      console.error('Failed to send message:', err)
      setError(err.response?.data?.error || 'Failed to send message. Please try again.')
      
      // Remove the optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id !== tempUserMessage.id))
    } finally {
      setSending(false)
    }
  }

  const handleClearChat = async () => {
    if (!window.confirm('Are you sure you want to clear all chat history?')) {
      return
    }

    try {
      await api.clearChatHistory()
      setMessages([])
    } catch (err) {
      console.error('Failed to clear chat:', err)
      setError('Failed to clear chat history')
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatMessageTime = (dateString) => {
    try {
      return format(new Date(dateString), 'h:mm a')
    } catch {
      return ''
    }
  }

  return (
    <Box sx={{ 
      maxWidth: 1200, 
      mx: 'auto', 
      p: 3,
      height: 'calc(100vh - 100px)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Card 
        elevation={3}
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2
        }}
      >
        {/* Header */}
        <CardHeader
          title={
            <Stack direction="row" alignItems="center" spacing={1}>
              <BotIcon color="primary" />
              <Typography variant="h6" component="span" fontWeight="bold">
                AI Support Assistant
              </Typography>
            </Stack>
          }
          action={
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                icon={<CheckCircleIcon />}
                label="Connected"
                color="success"
                size="small"
                sx={{ fontWeight: 500 }}
              />
              {messages.length > 0 && (
                <Tooltip title="Clear chat history">
                  <IconButton
                    size="small"
                    onClick={handleClearChat}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          }
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}
        />

        {/* Messages Container */}
        <CardContent
          ref={messagesContainerRef}
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            bgcolor: 'background.default',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'rgba(0,0,0,0.3)',
            },
          }}
        >
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
              <CircularProgress />
            </Box>
          ) : messages.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 6,
                textAlign: 'center',
                bgcolor: 'transparent',
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2
              }}
            >
              <MessageIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Start a conversation with the AI Assistant
              </Typography>
              <Typography variant="body2" color="text.disabled">
                Ask me anything and I'll help you out!
              </Typography>
            </Paper>
          ) : (
            <>
              {messages.map((message) => (
                <Box
                  key={message.id || `msg-${message.created_at}`}
                  sx={{
                    display: 'flex',
                    justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                    width: '100%'
                  }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      bgcolor: message.role === 'user' ? 'primary.main' : 'background.paper',
                      color: message.role === 'user' ? 'primary.contrastText' : 'text.primary',
                      borderRadius: 2,
                      borderTopLeftRadius: message.role === 'assistant' ? 0 : 2,
                      borderTopRightRadius: message.role === 'user' ? 0 : 2,
                    }}
                  >
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      {message.content}
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={1}
                      mt={1.5}
                      sx={{ opacity: 0.8 }}
                    >
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        {message.role === 'user' ? (
                          <>
                            <PersonIcon sx={{ fontSize: 16 }} />
                            <Typography variant="caption">You</Typography>
                          </>
                        ) : (
                          <>
                            <BotIcon sx={{ fontSize: 16 }} />
                            <Typography variant="caption">AI Assistant</Typography>
                          </>
                        )}
                      </Stack>
                      <Typography variant="caption">
                        {formatMessageTime(message.created_at)}
                      </Typography>
                    </Stack>
                  </Paper>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </CardContent>

        {/* Error Display */}
        {error && (
          <Box sx={{ px: 3, pt: 1 }}>
            <Chip
              label={error}
              color="error"
              size="small"
              onDelete={() => setError('')}
              sx={{ width: '100%', justifyContent: 'flex-start' }}
            />
          </Box>
        )}

        <Divider />

        {/* Input Form */}
        <Box
          component="form"
          onSubmit={handleSendMessage}
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider'
          }}
        >
          <Stack direction="row" spacing={1} alignItems="flex-end">
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              variant="outlined"
              size="small"
              disabled={sending}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage(e)
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '24px',
                  bgcolor: 'background.default',
                  '& fieldset': {
                    borderColor: 'divider',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <IconButton
              type="submit"
              color="primary"
              disabled={!messageInput.trim() || sending}
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                '&.Mui-disabled': {
                  bgcolor: 'action.disabledBackground',
                  color: 'action.disabled',
                },
                borderRadius: '50%',
                width: 48,
                height: 48,
              }}
            >
              {sending ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SendIcon />
              )}
            </IconButton>
          </Stack>
        </Box>
      </Card>
    </Box>
  )
}

export default Chats

